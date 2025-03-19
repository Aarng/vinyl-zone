import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const DropdownButton = () => {
  // Estado para controlar la visibilidad del dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad del dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Botón principal con InteractiveHoverButton */}
      <InteractiveHoverButton className="bg-red" ballColor="bg-white" textColor1="text-white" textColor2="text-vermilion" onClick={toggleDropdown}>
        Categorías
      </InteractiveHoverButton>

      {/* Contenido del dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "#fff",
              border: "1px solid #ccc",
              padding: "10px",
              zIndex: 10,
              minWidth: "200px",
            }}
          >
            {/* Géneros Musicales */}
            <div>
              <strong class="py-6">Géneros Musicales</strong>
              <ul style={{ listStyle: "none", padding: 10 }}>

                <li>
                  <a href="">Techno</a>
                </li>
                <li>
                  <a href="">Electrónica </a>
                </li>
                <li>
                  <a href="">Rock </a>
                </li>
                <li>
                  <a href="">Disco </a>
                </li>
                <li>
                  <a href="">Funk </a>
                </li>
                <li>
                  <a href="">Pop </a>
                </li>
                <li>
                  <a href="">New Wave </a>
                </li>
                <li>
                  <a href="">Synch pop </a>
                </li>
                <li>
                  <a href="">House </a>
                </li>
                <li>
                  <a href="">Euro Dance </a>
                </li>
                <li>
                  <a href="">Italo disco </a>
                </li>
                <li>
                  <a href="">High Energy </a>
                </li>

              </ul>
            </div>

            {/* Ofertas */}
            <div>
              <strong>Ofertas</strong>
              <ul style={{ listStyle: "none", padding: 5 }}>
              <li>
                  <a href="">Lo Mas Nuevo</a>
                </li>
                <li>
                  <a href="">Destacados </a>
                </li>
              </ul>
            </div>

            {/* Formatos */}
            <div>
              <strong>Formatos</strong>
              <ul style={{ listStyle: "none", padding: 5 }}>
                <li>
                <a href="">7"</a>
                </li>
                <li>
                <a href="">12"</a>
                </li>
                <li>
                <a href="">EP</a>
                </li>
                <li>
                <a href="">LP</a>
                </li>
                <li>
                <a href="">Album</a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownButton;