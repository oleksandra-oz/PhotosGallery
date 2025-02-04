import { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const notify = () => toast.error("Cannot be empty");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      notify();
      return;
    }
    onSubmit(query.trim());
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={s.inputsearch}
        onChange={handleChange}
        value={query}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
      <button className={s.buttonsearch} type="submit">
        Search
      </button>
    </form>
  );
}
