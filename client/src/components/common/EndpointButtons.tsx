import { useNavigate } from "react-router";

import AuthWrapper from "./AuthWrapper";

const IllustrationsComponents = () => {
  const nav = useNavigate();

  return <button onClick={() => nav("/illustrations")}>Illustrations</button>;
};

const PhotosComponents = () => {
  const nav = useNavigate();

  return <button onClick={() => nav("/photos")}>Photos</button>;
};

const VideosComponents = () => {
  const nav = useNavigate();

  return <button onClick={() => nav("/videos")}>Videos</button>;
};

const IllustrationsButton = () => {
  return <div>{AuthWrapper(IllustrationsComponents)}</div>;
};

const PhotosButton = () => {
  return <div>{AuthWrapper(PhotosComponents)}</div>;
};

const VideosButton = () => {
  return <div>{AuthWrapper(VideosComponents)}</div>;
};

export { IllustrationsButton, PhotosButton, VideosButton };
