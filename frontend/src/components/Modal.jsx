import React, { useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ isOpen, closeModal, child }) => {

  document.body.style.overflow = isOpen ? "hidden" : "auto";    // Locking and restoring

  useEffect(() => {
    const escapeKeyExit = (e) => {        // ESC escape modal
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", escapeKeyExit);

    return () => {
      document.removeEventListener("keydown", escapeKeyExit);
    }

  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-gray-900 opacity-70"
            onClick={closeModal}
          ></div>
          <div className="relative flex justify-center bg-white w-7/10 h-9/10 rounded-lg overflow-y-auto"
            aria-modal="true">
            <IoMdCloseCircle style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "gray",
              fontSize: "2rem",
              cursor: "pointer"
            }} />
            {child}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;