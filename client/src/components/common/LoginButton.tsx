import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../navbar/menu_components/Menu";

const LoginButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <button
      onClick={() => {
        nav("/login");
        collapseMenu();
      }}
      className="button"
    >
      Login
    </button>
  );
};

export default LoginButton;
