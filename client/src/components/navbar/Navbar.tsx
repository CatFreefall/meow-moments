import { useEffect, useState } from "react";

import { Menu } from "./menu_components/Menu";

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

  return (
    <nav
      className={`bg-lightgrey p-4 flex items-center font-header fixed w-full top-0 ${
        showNavBar ? "translate-y-0" : "-translate-y-full"
      } transition duration-300 ease-out`}
    >
      <Menu />
      <img src="/pet.webp" alt="" className="w-20 ml-7 mr-3" />
      <h1 className="text-5xl">MeowMoments</h1>
    </nav>
  );
};

export default Navbar;
