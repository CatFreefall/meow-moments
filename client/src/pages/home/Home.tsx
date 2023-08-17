import { useState } from "react";

import Footer from "../../components/common/Footer";
import CatASCII from "./components/CatASCII";
import CatSlogan from "./components/CatSlogan";
import LoginContainer from "./components/LoginContainer";
import RegistrationContainer from "./components/RegistrationContainer";
import Welcome from "./components/Welcome";
import useHashtags from "../../hooks/useHashtags";
import IndividualTag from "../hashtags/components/IndividualTag";
import { tag } from "../../util/tagType";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { hashtags } = useHashtags();

  const setLoaded = () => {
    setIsLoading(false);
  };

  return (
    <section>
      <div className="h-screen flex">
        <div className="flex flex-col mx-5 w-screen">
          <div className="flex flex-col flex-grow justify-center items-center">
            <Welcome />
            <CatASCII />
            <CatSlogan />
          </div>
          <img
            src={
              isLoading
                ? "assets/images/peeking-cat-waving-lazy.webp"
                : "assets/images/peeking-cat-waving.svg"
            }
            alt=""
            loading="lazy"
            onLoad={() => setLoaded()}
            className="w-56 mt-auto mb-2 self-center"
          />
        </div>
      </div>
      <div className="flex flex-col text-center mt-16 mx-4">
        <RegistrationContainer />
        <LoginContainer />
        <img
          src="assets/images/trending-icons.svg"
          alt=""
          className="w-28 my-10 self-center"
        ></img>
        <div>
          {hashtags.map(
            (hashtag: tag, index: number) =>
              index <= 4 && <IndividualTag key={index} tag={hashtag} />
          )}
        </div>
        <img
          src="assets/images/fat-cat.gif"
          alt=""
          className="w-40 self-center"
        ></img>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
