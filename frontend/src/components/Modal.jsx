import React, { useContext, useEffect, useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import LoggingContext from "../tool/logging/LoggingContext";

const Modal = ({ isOpen, closeModal, child }) => {

  const { logged } = useContext(LoggingContext);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {       // Scrolling when not logged
    if (!isOpen) return;

    const scrollToMiddle = () => {
      if (containerRef.current) {
        const { scrollHeight } = containerRef.current;
        containerRef.current.scrollTo({
          top: scrollHeight / 3,
          behavior: 'smooth', 
        });
      }
    };
    if (!logged) {
      scrollToMiddle();
    }
  }, [isOpen, logged])


  useEffect(() => {
    if (!isOpen) return;

    const escapeKeyExit = (e) => {        // ESC escape modal
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escapeKeyExit);

    return () => {
      document.removeEventListener("keydown", escapeKeyExit);
    }
  }, [closeModal, isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-gray-900 opacity-70"
            onClick={closeModal}
          ></div>
          <div
            className="relative flex m-0 justify-center bg-white w-7/10 h-9/10 rounded-lg overflow-y-auto"
            aria-modal="true"
            ref={containerRef}
          >
            <IoMdCloseCircle className="absolute inline-block top-2.5 right-2.5 text-gray-500 text-3xl cursor-pointer z-50"
              onClick={closeModal} />
            {child}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
