import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const PostButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <div
      className="flex items-center mobile-menu-element"
      onClick={() => {
        nav("/post");
        collapseMenu();
      }}
    >
      <button className="flex my-3 items-center">
        <img
          src="/assets/icons/post-icon.webp"
          alt=""
          className="w-5 h-5 mx-3 "
        ></img>
        Post Something!
      </button>
    </div>
  );
};

export default PostButton;