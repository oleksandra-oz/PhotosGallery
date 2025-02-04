export default function ImageCard({ description, urls, likes }) {
  return (
    <div>
      <img src={urls.small} alt={description} />
      <p>Likes: {likes}</p>
    </div>
  );
}
