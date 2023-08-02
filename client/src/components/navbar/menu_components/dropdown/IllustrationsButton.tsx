import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { MenuStateContext } from "../Menu";
import MenuSectionDivider from "../MenuSectionDivider";
import DropdownLabel from "./components/DropdownLabel";
import TrendingButton from "./components/TrendingButton";
import RecentButton from "./components/RecentButton";

const IllustrationsButton = () => {
  const collapseMenu = useContext(MenuStateContext);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const nav = useNavigate();
  return (
    <section className=" bg-lightgrey mobile-menu-element">
      <DropdownLabel
        dropdownActive={dropdownActive}
        contentType="Illustrations"
      />
      <input
        type="checkbox"
        id="dropdown"
        className="absolute opacity-0 h-0 checked:h-fit"
        onChange={toggleDropdown}
      />
      <ul
        className={`w-full overflow-hidden ${dropdownActive ? "h-fit" : "h-0"}`}
      >
        <MenuSectionDivider />
        <RecentButton
          collapseMenu={collapseMenu}
          toggleDropdown={toggleDropdown}
          nav={nav}
        />
      </ul>
      <ul
        className={`w-full overflow-hidden ${dropdownActive ? "h-fit" : "h-0"}`}
      >
        <TrendingButton
          collapseMenu={collapseMenu}
          toggleDropdown={toggleDropdown}
          nav={nav}
        />
      </ul>
    </section>
  );
};

export default IllustrationsButton;
