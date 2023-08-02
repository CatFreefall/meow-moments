import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const PhotosButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <section
      className="flex items-center mobile-menu-element"
      onClick={() => {
        nav("/photos");
        collapseMenu();
      }}
    >
      <button className="flex my-3 items-center">
        <img
          src="/assets/icons/photo-icon.webp"
          alt=""
          className="w-5 h-5 mx-3"
        ></img>
        Photos
      </button>
    </section>
  );
};

export default PhotosButton;
