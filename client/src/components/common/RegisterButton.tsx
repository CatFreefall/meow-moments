import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MenuStateContext } from "../navbar/menu_components/Menu";

const RegisterButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  const nav = useNavigate();
  return (
    <button
      onClick={() => {
        nav("/register");
        collapseMenu();
      }}
      className="button"
    >
      Register
    </button>
  );
};

export default RegisterButton;
