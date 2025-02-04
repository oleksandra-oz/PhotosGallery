import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import axios from "axios";
import { API_KEY } from "./api.js";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [modalLikes, setModalLikes] = useState(null);
  const [modalUser, setModalUser] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { total, total_pages, results } = (
          await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}&per_page=15&orientation=landscape&page=${page}`
          )
        ).data;
        setImages((prev) => [...prev, ...results]);
        setPerPage(Math.ceil(total / 15));
        if (!results.length) {
          ///maybe it should be images.length
          return setIsEmpty(true);
        }
        setIsVisible(page < total_pages); //btn
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false); //btn
  };

  const onLoadMore = () => {
    setPage((perPage) => perPage + 1);
  };
  const openModal = (src, alt, likes, user) => {
    setModalIsOpen(true);
    setModalAlt(alt);
    setModalSrc(src);
    setModalLikes(likes);
    setModalUser(user);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalAlt("");
    setModalSrc("");
    setModalLikes(null);
    setModalUser(null);
  };

  return (
    <>
      <header>
        <Toaster position="top-right" reverseOrder={false} />
        <SearchBar onSubmit={onHandleSubmit} />
      </header>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <ImageGallery results={images} openModal={openModal} />
      )}

      {isVisible && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? <Loader /> : "Load More"}
        </LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
        likes={modalLikes}
        user={modalUser}
      />
    </>
  );
}

export default App;
