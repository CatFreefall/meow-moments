import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const HomeButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div className="flex items-center mobile-menu-element">
      <button
        onClick={() => {
          nav("/");
          collapseMenu();
        }}
        className="flex my-3"
      >
        <img
          src="/assets/icons/home-icon.webp"
          alt=""
          className="w-10 mx-4"
        ></img>
        Home
      </button>
      <button className="w-10 ml-auto mr-6"></button>
    </div>
  );
};

export default HomeButton;
