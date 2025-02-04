import { InfinitySpin } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loaderContainer}>
      <InfinitySpin width="200" color="#007bff" />
    </div>
  );
}
