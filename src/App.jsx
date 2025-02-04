import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import axios from "axios";
import { API_KEY } from "./api.js";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [perPage, setPerPage] = useState(1);

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

        if (!results.length) {
          ///maybe it should be images.length
          return setIsEmpty(true);
        }
        setImages((prev) => [...prev, ...results]);
        setPerPage(Math.ceil(total / 15));
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
    setIsEmpty(false);
  };
  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {error && <p>Error: {error.message}</p>}
      <ImageGallery results={images} />
    </>
  );
}

export default App;
