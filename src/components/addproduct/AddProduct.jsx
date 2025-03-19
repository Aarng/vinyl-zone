import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase";
import edit from "../../assets/pencilSquare.svg";
import trash from "../../assets/trash.svg";
import Edit from "../edit/Edit";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [photos, setPhotos] = useState("");
  const [video, setVideo] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "products"));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(fireDB, "products"), {
        name,
        price,
        condition,
        description,
        format,
        photos: photos.split(","),
        video: video.split(","),
      });
      alert("Producto agregado exitosamente");
      setName("");
      setPrice("");
      setCondition("");
      setDescription("");
      setFormat("");
      setPhotos("");
      setVideo("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "products", id));
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className='flex h-screen p-5'>
      <div className='w-1/2 bg-red-300 px-10 py-10 rounded-xl'>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Agregar Producto</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input type="text" placeholder="Nombre del producto" value={name} onChange={(e) => setName(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <input type="text" placeholder="Estado" value={condition} onChange={(e) => setCondition(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <input type="text" placeholder="Formato" value={format} onChange={(e) => setFormat(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <input type="text" placeholder="Fotos (separadas por comas)" value={photos} onChange={(e) => setPhotos(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <input type="text" placeholder="Video (separado por comas)" value={video} onChange={(e) => setVideo(e.target.value)} required className='bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none' />
          <button type="submit" className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg hover:bg-yellow-600'>Agregar Producto</button>
        </form>
      </div>
      
      <div className='w-1/2 pl-5'>
        <h2 className='text-xl font-bold mb-4'>Lista de Productos</h2>
        <table className='table-auto w-full bg-white rounded-lg shadow-md'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-4 py-2'>Nombre</th>
              <th className='px-4 py-2'>Precio</th>
              <th className='px-4 py-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className='border-t'>
                <td className='px-4 py-2'>{product.name}</td>
                <td className='px-4 py-2'>{product.price}</td>
                <td className='px-4 py-2 flex gap-2'>
                  <img src={edit} alt="edit"  className='w-6 cursor-pointer transition-colors duration-300 hover:bg-blue-500 ' onClick={() => setEditingProduct(product)} />
                  <img src={trash} alt="delete" className='w-6 cursor-pointer transition-colors duration-300 hover:bg-blue-500   ' onClick={() => handleDelete(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProduct && <Edit product={editingProduct} onClose={() => setEditingProduct(null)} />}
    </div>
  );
};

export default AddProduct;
