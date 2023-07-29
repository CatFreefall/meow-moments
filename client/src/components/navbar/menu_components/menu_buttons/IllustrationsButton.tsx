import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const IllustrationsButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div
      className="flex mobile-menu-element"
      onClick={() => {
        nav("/illustrations");
        collapseMenu();
      }}
    >
      <button className="flex my-3 items-center">
        <img
          src="/assets/icons/paintbrush-icon.webp"
          alt=""
          className="w-5 h-5 mx-3"
        ></img>
        Illustrations
      </button>
    </div>
  );
};

export default IllustrationsButton;
