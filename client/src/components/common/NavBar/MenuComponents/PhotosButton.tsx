import { useNavigate } from "react-router-dom";

const PhotosButton = () => {
  const nav = useNavigate();
  return <button onClick={() => nav("/photos")}>Photos</button>;
};

export default PhotosButton;
