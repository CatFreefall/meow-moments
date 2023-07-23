import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const VideosButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div className="flex items-center mobile-menu-element">
      <button
        onClick={() => {
          nav("/videos");
          collapseMenu();
        }}
        className="flex my-3 items-center"
      >
        <img
          src="/assets/icons/video-icon.webp"
          alt=""
          className="w-5 h-5 mx-3 "
        ></img>
        Videos
      </button>
      <button className="w-5 ml-auto mr-6">
        <img
          src="/assets/icons/downwards-arrow-icon.webp"
          alt=""
          onClick={() => collapseMenu()}
        ></img>
      </button>
    </div>
  );
};

export default VideosButton;
