import { useEffect, useCallback } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

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
      className={s.content}
      overlayClassName={s.overlay}
    >
      <img className={s.imagecontainer} src={src} alt={alt} />
      <p className={s.text}>
        <strong>Description:</strong> {alt || "No description available"}
      </p>
      <p className={s.text}>
        <strong>Likes:</strong> 💖 {likes}
      </p>
      <p className={s.text}>
        <strong>Username:</strong> 👻 {user}
      </p>
    </Modal>
  );
};

export default ImageModal;
