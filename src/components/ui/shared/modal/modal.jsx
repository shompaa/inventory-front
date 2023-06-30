import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Modal = ({ isOpen, children, onClose, size, title, footer }) => {
  const sizeClasses = {
    s: "w-64 h-72",
    m: "w-3/4 h-2/3",
    l: "w-full h-3/4",
    xl: "w-full h-full max-w-screen-xl max-h-screen-90",
  };

  // Asegurarse de que el cuerpo del documento no pueda desplazarse
  // cuando el modal está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white rounded-lg overflow-auto ${
              sizeClasses[size] || sizeClasses.m
            }`}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
          >
            {title && (
              <div className="px-4 py-2 border-b">
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            )}

            <div className="px-4 py-2">{children}</div>

            {footer && <div className="px-4 py-2 border-t">{footer}</div>}

            <button
              onClick={onClose}
              className="absolute top-0 right-0 px-4 py-2 text-lg font-bold"
            >
              X
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
