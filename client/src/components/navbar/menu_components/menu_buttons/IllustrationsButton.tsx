import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const IllustrationsButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div className="flex items-center mobile-menu-element">
      <button
        onClick={() => {
          nav("/illustrations");
          collapseMenu();
        }}
        className="flex my-3"
      >
        <img
          src="/assets/icons/paintbrush-icon.webp"
          alt=""
          className="w-5 h-5 mx-3"
        ></img>
        Illustrations
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

export default IllustrationsButton;
