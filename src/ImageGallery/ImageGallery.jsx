import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ results, openModal }) => {
  return (
    <ul className={s.gallery}>
      {results.map(({ id, description, urls, likes, user }) => (
        <li key={id}>
          <ImageCard
            description={description}
            urls={urls}
            likes={likes}
            user={user}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
