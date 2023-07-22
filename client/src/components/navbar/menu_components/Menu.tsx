import React, { useState } from "react";

import MenuButton from "./menu_buttons/MenuButton";
import CloseMenuButton from "./menu_buttons/CloseMenuButton";
import MenuContents from "./MenuContents";

// used to determine whether the menu is open or not
const MenuStateContext = React.createContext(function () {});

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const collapseMenu = () => {
    setShowMenu(false);
    document.body.style.overflow = "auto";
  };

  return (
    <MenuStateContext.Provider value={collapseMenu}>
      <div>
        <MenuButton menuActive={setShowMenu} />
        {showMenu ? (
          <div
            className={
              "fixed top-0 left-0 h-screen w-screen transition duration-200 bg-darkgrey bg-opacity-50 ease-out"
            }
            onClick={() => collapseMenu()}
          ></div>
        ) : (
          <div></div>
        )}

        <div
          className={`fixed top-0 left-0 bg-darkgrey border-r-2 border-lightgrey h-screen w-3/4 transition duration-300 ease-in-out ${
            showMenu ? null : "-translate-x-full"
          }`}
        >
          <div className="bg-lightgrey flex items-center font-header p-4">
            <CloseMenuButton />
            <img src="/pet.webp" alt="" className="w-20 ml-7 mr-3" />
            <h1 className="text-5xl">MeowMoments</h1>
          </div>
          <MenuContents />
        </div>
      </div>
    </MenuStateContext.Provider>
  );
};

export { Menu, MenuStateContext };
