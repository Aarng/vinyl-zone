import React, { useState, useEffect, useContext} from 'react';

import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from "../../firebase";
import female from "../../assets/female.png"
import male from "../../assets/male.png"
import { CartContext } from '../cartcontext/CartContext';
import HeroVideoDialog from '../magicui/hero-video-dialog';

const Details = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null); // Estado para la imagen principal

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = { id: productSnap.id, ...productSnap.data() };
          setProduct(productData);

          // Establecer la primera foto como imagen principal
          if (productData.photos && productData.photos.length > 0) {
            setMainImage(productData.photos[0]);
          }
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
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

  // Función para manejar el clic en las miniaturas
  const handleThumbnailClick = (photo) => {
    setMainImage(photo);
  };

  return (
    <div className="bg-light_red-900 min-h-screen flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-4xl bg-light_red-800 rounded-lg shadow-lg overflow-hidden flex p-16">
        {/* Left Section: Main Product Image */}
        <div className="flex-shrink-0">
          <img
            className="w-64 h-64 object-cover border-4 border-white"
            src={mainImage} // Foto principal seleccionada
            alt={product.name}
          />
        </div>
        {/* Small Gallery of 4 Images (Vertical) */}
        <div className="flex flex-col space-y-4 ml-8 flex-shrink-0 ">
          {product.photos.slice(0, 5).map((photo, index) => (
            <img
              key={index}
              className="w-32 h-32 object-cover border-4 border-white rounded-lg cursor-pointer transition-transform transform hover:scale-105"
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(photo)} // Cambia la foto principal
            />
          ))}
        </div>

        {/* Product Info Section */}
        <div className="px-6 py-4 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-900 mt-2">{product.description}</p>
          

          <strong>Formato</strong>
          <p className="text-sm text-gray-900 font-bold mt-2 flex flex-col ">{product.format}</p>


          <strong>Condicion</strong>
          <p className="text-sm text-gray-900 font-bold mt-2 flex flex-col ">{product.condition}</p>


         
          
          <p className="text-xl font-bold text-gray-800 mt-4">${product.price}</p>
          {/* Add to Cart Button */}
          <button  className="mt-6 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition duration-200"
           onClick={() => addToCart(product)} >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="max-w-4xl bg-light_red-800 rounded-lg shadow-lg overflow-hidden flex flex-col p-8 mt-8">
            <strong className="text-lg font-semibold text-gray-800 py-8">Video</strong>
                
                
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
        <div className="max-w-4xl bg-light_red-800 rounded-lg shadow-lg overflow-hidden flex flex-col p-64 mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                        <img
                        className="w-10 h-10 rounded-full"
                        src={female} // Placeholder profile image path
                        alt="Customer"
                        />
                        <p className="ml-4 text-gray-800">
                        <span className="font-semibold">Emily R.</span> - "Absolutely love the sound quality!"
                        </p>
                    </div>
                <div className="flex items-center">
                        <img
                         className="w-10 h-10 rounded-full"
                         src={male} // Placeholder profile image path
                         alt="Customer"
                        />
                        <p className="ml-4 text-gray-800">
                        <span className="font-semibold">James T.</span> - "A must-have for any vinyl collector."
                        </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Details;