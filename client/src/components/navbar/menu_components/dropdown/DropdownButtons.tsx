import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuStateContext } from "../Menu";
import MenuSectionDivider from "../MenuSectionDivider";
import IllustrationsDropdown from "./components/IllustrationsDropdown";
import PhotosDropdown from "./components/PhotosDropdown";
import VideosDropdown from "./components/VideosDropdown";
import TrendingButton from "./components/TrendingButton";
import RecentButton from "./components/RecentButton";

const generateDropdownButton = (contentType: string, endpoint: string) => {
  return () => {
    const collapseMenu = useContext(MenuStateContext);
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
      setDropdownActive(!dropdownActive);
    };

    const nav = useNavigate();
    const navigateTo = (endpoint: string) => {
      collapseMenu();
      toggleDropdown();
      nav(endpoint);
    };

    let DropdownComponent;
    if (contentType === "Illustrations") {
      DropdownComponent = IllustrationsDropdown;
    } else if (contentType === "Photos") {
      DropdownComponent = PhotosDropdown;
    } else {
      DropdownComponent = VideosDropdown;
    }

    return (
      <section className="bg-lightgrey mobile-menu-element mb-2">
        <DropdownComponent
          dropdownActive={dropdownActive}
          contentType={contentType}
        />
        <input
          type="checkbox"
          id={`${contentType.toLowerCase()}-dropdown`}
          className="absolute opacity-0 h-0 checked:h-fit"
          onChange={toggleDropdown}
        />
        <ul
          className={`w-full overflow-hidden ${
            dropdownActive ? "h-fit" : "h-0"
          }`}
        >
          <MenuSectionDivider />
          <span onClick={() => navigateTo(`${endpoint}/recent`)}>
            <RecentButton />
          </span>
        </ul>
        <ul
          className={`w-full overflow-hidden ${
            dropdownActive ? "h-fit" : "h-0"
          }`}
        >
          <span onClick={() => navigateTo(`${endpoint}/trending`)}>
            <TrendingButton />
          </span>
        </ul>
      </section>
    );
  };
};

// creating new dropdown button instances for each content type
const IllustrationsButton = generateDropdownButton(
  "Illustrations",
  "/illustrations"
);
const PhotosButton = generateDropdownButton("Photos", "/photos");
const VideosButton = generateDropdownButton("Videos", "/videos");

export { IllustrationsButton, PhotosButton, VideosButton };
