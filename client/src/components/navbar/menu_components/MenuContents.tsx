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
    <div className="flex flex-col items-center text-md font-body mt-4 h-7/8">
      <IllustrationsButton />
      <MenuSectionDivider />
      <PhotosButton />
      <MenuSectionDivider />
      <VideosButton />
      <MenuSectionDivider />
      <HashtagsButton />
      <MenuSectionDivider />
      <HomeButton />
      <img
        src="/assets/images/cat-1.webp"
        alt=""
        className="opacity-60 w-40 my-auto sm:w-28"
      ></img>

      {authenticated ? (
        <div className="py-2">
          <LogoutButton />
        </div>
      ) : (
        <div className="flex py-2">
          <LoginButton />
          <div className="h-8 w-2 bg-white rounded-full mx-2"></div>
          <RegisterButton />
        </div>
      )}
    </div>
  );
};

export default MenuContents;
