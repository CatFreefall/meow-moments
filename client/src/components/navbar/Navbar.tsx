import { useEffect, useState } from "react";

import { Menu } from "./menu_components/Menu";
import AccountNotVerified from "../toasts/AccountNotVerified";
import { useAuthContext } from "../../util/AuthState";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [previousPosition, setPreviousPosition] = useState(window.scrollY);

  useEffect(() => {
    const scroll = () => {
      const currentPosition = window.scrollY;
      currentPosition > previousPosition
        ? setShowNavBar(false)
        : setShowNavBar(true);
      setPreviousPosition(currentPosition);
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [previousPosition]);

  const {
    authentication: [authenticated],
    verification: [verified],
  } = useAuthContext();

  return (
    <div>
      <nav
        className={`bg-lightgrey p-3 flex items-center font-header fixed w-full top-0 transition duration-300 ease-out z-10 ${
          showNavBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Menu />
        <img src="/pet.webp" alt="" className="w-9 ml-4 mr-2" />
        <h1 className="text-2xl">MeowMoments</h1>
      </nav>

      <div className={`transition duration-100 ease-in fixed top-16 ${showNavBar ? "translate-y-0" : "-translate-y-16"}`}>
        {authenticated && !verified ? <AccountNotVerified /> : null}
      </div>
    </div>
  );
};

export default Navbar;
