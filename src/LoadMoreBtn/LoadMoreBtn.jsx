import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ children, onClick, disabled }) {
  return (
    <button className={s.buttonload} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
