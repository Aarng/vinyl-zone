import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase";
import female from "../../assets/female.png";
import male from "../../assets/male.png";
import { CartContext } from "../cartcontext/CartContext";
import HeroVideoDialog from "../magicui/hero-video-dialog";

const Details = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null); // State for the main image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = { id: productSnap.id, ...productSnap.data() };
          setProduct(productData);

          // Set the first photo as the main image
          if (productData.photos && productData.photos.length > 0) {
            setMainImage(productData.photos[0]);
          }
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-600">Product not found.</p>;
  }

  // Function to handle thumbnail clicks
  const handleThumbnailClick = (photo) => {
    setMainImage(photo);
  };

  return (
    <div className="bg-light_red-900 min-h-screen flex flex-col justify-center items-center py-8 px-4 sm:py-12">
      {/* Main Content Container */}
      <div className="max-w-6xl w-full bg-light_red-800 rounded-lg shadow-lg overflow-hidden p-6 sm:p-12">
        {/* Product Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Section: Main Product Image */}
          <div className="flex-shrink-0 w-full sm:w-64">
            <img
              className="w-full h-auto sm:h-64 object-cover border-4 border-white rounded-lg"
              src={mainImage} // Selected main image
              alt={product.name}
            />
          </div>

          {/* Small Gallery of Thumbnails */}
          <div className="flex flex-wrap sm:flex-col gap-4 w-full sm:w-32">
            {product.photos.slice(0, 5).map((photo, index) => (
              <img
                key={index}
                className="w-20 h-20 sm:w-32 sm:h-32 object-cover border-4 border-white rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(photo)} // Change the main image
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{product.name}</h2>
          <p className="text-sm sm:text-base text-gray-900 mt-2">{product.description}</p>

          <strong className="block text-sm sm:text-base text-gray-900 mt-4">Format</strong>
          <p className="text-sm sm:text-base text-gray-900 font-bold mt-2">{product.format}</p>

          <strong className="block text-sm sm:text-base text-gray-900 mt-4">Condition</strong>
          <p className="text-sm sm:text-base text-gray-900 font-bold mt-2">{product.condition}</p>

          <p className="text-lg sm:text-xl font-bold text-gray-800 mt-4">${product.price}</p>

          {/* Add to Cart Button */}
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-red-700 transition duration-200"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-6xl w-full bg-light_red-800 rounded-lg shadow-lg overflow-hidden p-6 sm:p-12 mt-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Video</h3>
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc={product.video}
          thumbnailSrc={product.photos}
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc={product.video}
          thumbnailSrc={product.video}
          thumbnailAlt="Hero Video"
        />
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-6xl w-full bg-light_red-800 rounded-lg shadow-lg overflow-hidden p-6 sm:p-12 mt-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              src={female} // Placeholder profile image path
              alt="Customer"
            />
            <p className="ml-4 text-sm sm:text-base text-gray-800">
              <span className="font-semibold">Emily R.</span> - "Absolutely love the sound quality!"
            </p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              src={male} // Placeholder profile image path
              alt="Customer"
            />
            <p className="ml-4 text-sm sm:text-base text-gray-800">
              <span className="font-semibold">James T.</span> - "A must-have for any vinyl collector."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;