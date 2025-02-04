import s from "./ImageCard.module.css";

export default function ImageCard({
  description,
  urls,
  likes,
  user,
  openModal,
}) {
  return (
    <div>
      <img
        className={s.imgcard}
        src={urls.small}
        alt={description}
        onClick={() =>
          openModal(urls.regular, description, likes, user.username)
        }
      />
    </div>
  );
}
