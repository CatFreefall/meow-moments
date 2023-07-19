import { useEffect, useState } from "react";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const MenuButton = () => (
    <div>
      <button onClick={() => setShowMenu(true)}>
        <img
          src="../../../assets/icons/menu-icon.webp"
          alt=""
          className="w-12 ml-4"
        />
      </button>
    </div>
  );

  const MenuContainer = () => {
    return (
      <div className="fixed top-0 left-0 bg-darkgrey h-screen w-3/4 transition duration-700 ease out">
        temp
      </div>
    );
  };

  return (
    <div>
      <MenuButton />
      <div
        className={`fixed top-0 left-0 bg-darkgrey h-screen w-3/4 transition duration-700 ease out ${
          showMenu ? console.log(showMenu) : "-translate-x-full"
        }`}
      >
        <button onClick={() => setShowMenu(false)}>Go Back</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [previousPosition, setPreviousPosition] = useState(window.pageYOffset);

  useEffect(() => {
    const scroll = () => {
      const currentPosition = window.pageYOffset;
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
      <img src="../../../pet.webp" alt="" className="w-20 ml-7 mr-3" />
      <h1 className="text-5xl">MeowMoments</h1>
    </nav>
  );
};

export default Navbar;
