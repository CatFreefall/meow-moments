import { useContext } from "react";

import { MenuStateContext } from "../Menu";

const CloseMenuButton = () => {
  const collapseMenu = useContext(MenuStateContext);

  return (
    <button>
      <img
        src="/assets/icons/left-arrow-icon.webp"
        className="ml-1 w-5 font-bold my-1"
        alt=""
        onClick={() => collapseMenu()}
      />
    </button>
  );
};

export default CloseMenuButton;
