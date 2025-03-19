// src/components/Cards.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase";
import { BlurFade } from "../magicui/blur-fade";
import { Link } from "react-router-dom";

const Cards = ({ addToCart }) => {
  
  const [products, setProducts] = useState([]);

  // Obtener productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    

 
    <section className="bg-light_red-900 py-8 antialiased dark:bg-gray-900 md:p-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl py-6">
          Productos
        </h2>
        
      </div>
      <BlurFade duration={0.5} delay={1.1}>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div  key={product.id}
          to={`/product/${product.id}`}
                className="rounded-lg border border-gray-200 bg-light_red-800 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-transform transform hover:scale-105"> 
         
               <Link key={product.id}
               to={`/product/${product.id}`}
               >
                <div className="h-56 w-full ">
                  <img
                  className="mx-auto h-full border-4 border-white rounded-lg"
                  src={product.photos && product.photos[0]}
                  alt={product.name}
                  />
                  </div>
                    <div className="pt-6">
                    
                        <div
                        className="bg-red-600 rounded-lg shadow-md overflow-hidden "
                        >
                          <h3 className="text-lg font-semibold text-white dark:text-white hover:text-white-400 px-4">
                          {product.name}
                          </h3>
                          <p className="px-6 mt-2 text-2xl font-extrabold text-white dark:text-white hover:text-white-400">
                          ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                    onClick={() => addToCart(product)} // Agregar producto al carrito
                  class="mt-4 w-full rounded-lg shadow-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                >
                  Add to Cart
                </button>
              </div>
              
          
          
        ))}
        
      </div>
      </BlurFade>
    </section>
   
  );
};

export default Cards;