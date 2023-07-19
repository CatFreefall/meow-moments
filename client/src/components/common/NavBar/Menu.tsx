import { useState } from "react";
import MenuContents from "./MenuContents";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const MenuButton = () => (
    <div>
      <button
        onClick={() => {
          setShowMenu(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <img
          src="../../../assets/icons/menu-icon.webp"
          alt=""
          className="w-12 ml-4"
        />
      </button>
    </div>
  );

  const CloseMenuButton = () => {
    return (
      <button>
        <img
          src="../../../assets/icons/left-arrow-icon.webp"
          className="w-12 ml-4"
          alt=""
          onClick={() => {
            setShowMenu(false);
            document.body.style.overflow = "auto";
          }}
        />
      </button>
    );
  };

  return (
    <div>
      <MenuButton />
      {showMenu ? (
        <div
          className={
            "fixed top-0 left-0 h-screen w-screen transition duration-500 bg-darkgrey bg-opacity-75 ease-out"
          }
          onClick={() => {
            setShowMenu(false);
            document.body.style.overflow = "auto";
          }}
        ></div>
      ) : (
        <div></div>
      )}
      <div
        className={`fixed top-0 left-0 bg-darkgrey h-screen w-3/4 transition duration-300 ease-in-out ${
          showMenu ? null : "-translate-x-full"
        }`}
      >
        <div className="bg-lightgrey flex items-center font-header p-4">
          <CloseMenuButton />
          <img src="../../../pet.webp" alt="" className="w-20 ml-7 mr-3" />
          <h1 className="text-5xl">MeowMoments</h1>
        </div>
        <MenuContents />
      </div>
    </div>
  );
};

export default Menu;
