import { useEffect, useCallback } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     padding: "0",
//     border: "none",
//     background: "transparent",
//   },
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };

Modal.setAppElement("#root"); // Вик лише раз

const ImageModal = ({ modalIsOpen, closeModal, src, alt, likes, user }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (modalIsOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIsOpen, handleKeyDown]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      // className={s.overlay}
    >
      <div onClick={closeModal} className={s.content}>
        <img src={src} alt={alt} />
        <p className={s.text}>
          <strong>Description:</strong> {alt || "No description available"}
        </p>
        <p className={s.text}>
          <strong>Likes:</strong> 💖 {likes}
        </p>
        <p className={s.text}>
          <strong>Username:</strong> 👻 {user}
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
