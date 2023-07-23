import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { MenuStateContext } from "../navbar/menu_components/Menu";

// this button logs the user out and refreshes the page. it does not
// have the same functionality as components like LoginButton and RegisterButton
const LogoutButton = () => {
  const nav = useNavigate();

  const collapseMenu = useContext(MenuStateContext);

  const logout = async () => {
    try {
      await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={async () => {
        await logout();
        collapseMenu();
        nav("/");
        window.location.reload();
      }}
      className="button"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
