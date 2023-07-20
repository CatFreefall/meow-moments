import { useNavigate } from "react-router-dom";

const VideosButton = () => {
  const nav = useNavigate();
  return <button onClick={() => nav("/videos")}>Videos</button>;
};

export default VideosButton;
