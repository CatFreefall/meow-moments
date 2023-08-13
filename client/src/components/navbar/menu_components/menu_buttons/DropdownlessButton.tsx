import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MenuStateContext } from "../Menu";

type DropdownlessButtonProps = {
  navPath: string;
  iconPath: string;
  buttonName: string;
};

const DropdownlessButton = ({
  navPath,
  iconPath,
  buttonName,
}: DropdownlessButtonProps) => {
  const collapseMenu = useContext(MenuStateContext);
  const nav = useNavigate();

  return (
    <div className="flex items-center mobile-menu-element">
      <button
        onClick={() => {
          nav(navPath);
          collapseMenu();
        }}
        className="flex my-3 items-center"
      >
        <img src={iconPath} alt="" className="w-5 h-5 mx-3 "></img>
        {buttonName}
      </button>
      <button className="w-10 ml-auto mr-6"></button>
    </div>
  );
};

export default DropdownlessButton;
