import LoginButton from "../../common/LoginButton";
import RegisterButton from "../../common/RegisterButton";

import MenuSectionDivider from "./MenuSectionDivider";

import IllustrationsButton from "./menu_buttons/IllustrationsButton";
import PhotosButton from "./menu_buttons/PhotosButton";
import VideosButton from "./menu_buttons/VideosButton";
import HashtagsButton from "./menu_buttons/HashtagsButton";
import HomeButton from "./menu_buttons/HomeButton";
import LogoutButton from "../../common/LogoutButton";

import { useAuthContext } from "../../../util/AuthState";

const MenuContents = () => {
  const {
    authentication: [authenticated],
  } = useAuthContext();

  return (
    <div className="flex flex-col items-center text-4xl font-body mt-16 h-5/6">
      <IllustrationsButton />
      <MenuSectionDivider />
      <PhotosButton />
      <MenuSectionDivider />
      <VideosButton />
      <MenuSectionDivider />
      <HashtagsButton />
      
      <HomeButton />
      <img
        src="/assets/images/cat-1.webp"
        alt=""
        className="opacity-60 w-96 my-auto"
      ></img>
      {authenticated ? (
        <LogoutButton />
      ) : (
        <div className="mt-auto flex">
          <LoginButton />
          <div className="h-14 w-2 bg-white rounded-full mx-4"></div>
          <RegisterButton />
        </div>
      )}
    </div>
  );
};

export default MenuContents;
