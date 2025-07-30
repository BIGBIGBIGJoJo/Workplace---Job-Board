import React from 'react';

const Modal = ({ isOpen, closeModal }) => {

  document.body.style.overflow = isOpen ? "hidden" : "auto";    // Locking and restoring

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-gray-300 opacity-70"
            onClick={closeModal}
          ></div>
          <div className="   bg-white w-7/10 h-9/10" aria-modal="true">
            test
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;