import { useNavigate } from "react-router";

import AuthWrapper from "../components/common/AuthWrapper";

import Illustrations from "../pages/illustrations/Illustrations";
import Photos from "../pages/photos/Photos";
import Videos from "../pages/videos/Videos";

const Home = () => {
  const nav = useNavigate();

  return (
    <>
      <button onClick={() => nav("/login")}>Log In</button>
      <button onClick={() => nav("/register")}>Register </button>
    </>
  );
};

export default Home;
