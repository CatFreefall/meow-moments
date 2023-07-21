import { useContext } from "react";

import { MenuStateContext } from "./Menu";

const CloseMenuButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  return (
    <button>
      <img
        src="/assets/icons/left-arrow-icon.webp"
        className="w-12 ml-4"
        alt=""
        onClick={() => collapseMenu()}
      />
    </button>
  );
};

export default CloseMenuButton;
