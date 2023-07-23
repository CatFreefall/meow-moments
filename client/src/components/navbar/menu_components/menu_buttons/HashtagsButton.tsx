import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const HashtagsButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div className="flex items-center mobile-menu-element">
      <button
        onClick={() => {
          nav("/hashtags");
          collapseMenu();
        }}
        className="flex my-3 items-center"
      >
        <img
          src="/assets/icons/hashtag-icon.webp"
          alt=""
          className="w-5 h-5 mx-3"
        ></img>
        Hashtags
      </button>
      <button className="w-10 ml-auto mr-6"></button>
    </div>
  );
};

export default HashtagsButton;
