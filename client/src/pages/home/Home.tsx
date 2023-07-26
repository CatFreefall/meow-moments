import Footer from "../../components/common/Footer";
import Navbar from "../../components/navbar/Navbar";
import CatASCII from "./components/CatASCII";
import CatSlogan from "./components/CatSlogan";
import LoginContainer from "./components/LoginContainer";
import RegistrationContainer from "./components/RegistrationContainer";
import TrendingIconsContainer from "./components/TrendingIconsContainer";
import Welcome from "./components/Welcome";

const Home = () => {
  return (
    <div>
      <div className="h-screen flex">
        <Navbar />

        <div className="flex flex-col mx-5 w-screen">
          <div className="flex flex-col flex-grow justify-center items-center">
            <Welcome />
            <CatASCII />
            <CatSlogan />
          </div>
          <img
            src="assets/images/peeking-cat-waving.svg"
            alt=""
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
        <TrendingIconsContainer />
        <img
          src="assets/images/fat-cat.gif"
          alt=""
          className="w-40 self-center"
        ></img>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
