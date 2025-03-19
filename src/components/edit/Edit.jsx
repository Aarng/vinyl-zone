import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase";

const Edit = ({ product, onClose }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [condition, setCondition] = useState(product.condition);
    const [description, setDescription] = useState(product.description);
    const [format, setFormat] = useState(product.format);
    const [photos, setPhotos] = useState(product.photos.join(","));
    const [video, setVideo] = useState(product.video.join(","));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productRef = doc(fireDB, "products", product.id);
            await updateDoc(productRef, {
                name,
                price,
                condition,
                description,
                format,
                photos: photos.split(","),
                video: video.split(","),
            });
            alert("Producto actualizado exitosamente");
            onClose();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    return (
    <div className='flex h-screen p-5'>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-red-300 px-10 py-10 w-1/2 rounded-xl shadow-lg w-96 relative">
                <button 
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">Editar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Nombre" />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Precio" />
                    <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Estado" />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Descripción"></textarea>
                    <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Formato" />
                    <input type="text" value={photos} onChange={(e) => setPhotos(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Fotos (separadas por comas)" />
                    <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} required className="bg-white mb-4 px-2 py-2 w-full rounded-lg text-gray-600 placeholder-gray-500 outline-none" placeholder="Video (separado por comas)" />
                    <button type="submit" className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg hover:bg-yellow-600">Actualizar Producto</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit;
