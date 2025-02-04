import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ results }) => {
  return (
    <ul className={s.gallery}>
      {results.map(({ id, description, urls, likes }) => (
        <li key={id}>
          <ImageCard description={description} urls={urls} likes={likes} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
