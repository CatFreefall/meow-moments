import { useNavigate } from "react-router";

import LogoutButton from "../components/common/LogoutButton";

const Home = () => {
  const nav = useNavigate();

  return (
    <>
      <button onClick={() => nav("/login")}>Log In</button>
      <button onClick={() => nav("/register")}>Register </button>
      <LogoutButton />
    </>
  );
};

export default Home;
