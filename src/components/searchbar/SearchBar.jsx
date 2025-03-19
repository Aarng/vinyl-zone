import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  const [products, setProducts] = useState([]); // Estado para almacenar los productos

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

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Campo de búsqueda */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {/* Ventana de resultados */}
      {search && (
        <div  className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              >
                {/* Imagen del producto */}
                <img
                  src={product.photos && product.photos[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                {/* Nombre del producto */}
                <span>{product.name}</span>
              </Link>
            ))
          ) : (
            <div className="p-4 text-gray-500">No se encontraron resultados.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;