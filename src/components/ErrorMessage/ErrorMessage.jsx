import s from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div style={s.container}>
      <p style={s.text}>❌ Error: {message}</p>
    </div>
  );
}
