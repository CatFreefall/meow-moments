import LoginButton from "../../common/LoginButton";
import RegisterButton from "../../common/RegisterButton";

import MenuSectionDivider from "./MenuSectionDivider";

import IllustrationsButton from "./IllustrationsButton";
import PhotosButton from "./PhotosButton";
import VideosButton from "./VideosButton";
import HashtagsButton from "./HashtagsButton";
import LogoutButton from "../../common/LogoutButton";

const MenuContents = () => {
  return (
    <div className="flex flex-col items-center text-4xl font-body mt-16 h-5/6">
      <div className="mobile-menu-element">
        <IllustrationsButton />
      </div>
      <MenuSectionDivider />
      <div className="mobile-menu-element">
        <PhotosButton />
      </div>
      <MenuSectionDivider />
      <div className="mobile-menu-element">
        <VideosButton />
      </div>
      <MenuSectionDivider />
      <div className="mobile-menu-element">
        <HashtagsButton />
      </div>
      <img
        src="/assets/images/cat-1.webp"
        alt=""
        className="opacity-60 w-96 my-auto"
      ></img>
      <LogoutButton />
      <div className="mt-auto flex">
        <LoginButton />
        <div className="h-14 w-2 bg-white rounded-full mx-4"></div>
        <RegisterButton />
      </div>
    </div>
  );
};

export default MenuContents;
