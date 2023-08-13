import LoginButton from "../../common/LoginButton";
import RegisterButton from "../../common/RegisterButton";

import {
  IllustrationsButton,
  PhotosButton,
  VideosButton,
} from "./dropdown/DropdownButtons";

import HashtagsButton from "./menu_buttons/HashtagsButton";
import HomeButton from "./menu_buttons/HomeButton";
import LogoutButton from "../../common/LogoutButton";
import PostACatButton from "./menu_buttons/PostACatButton";
import SettingsButton from "./menu_buttons/SettingsButton";

import { useAuthContext } from "../../../hooks/useAuthState";

const MenuContents = () => {
  const {
    verification: [verified],
    authentication: [authenticated],
  } = useAuthContext();

  return (
    <section className="flex flex-col items-center text-md font-body mt-4 h-7/8">
      <IllustrationsButton />
      <PhotosButton />
      <VideosButton />

      {verified ? <PostACatButton /> : null}
      <HashtagsButton />
      {authenticated ? <SettingsButton /> : null}
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
    </section>
  );
};

export default MenuContents;
