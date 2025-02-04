import s from "./ImageCard.module.css";
import Emoji from "react-emoji-render";

export default function ImageCard({ description, urls, likes }) {
  return (
    <div>
      <img className={s.imgcard} src={urls.small} alt={description} />
      <Emoji>
        <p>Likes: ❤️{likes}</p>
      </Emoji>
    </div>
  );
}
