import { useNavigate } from "react-router";

const Home = () => {
  const nav = useNavigate();

  return (
    <>
    <div>Homepage contents go here:</div>
      <button onClick={() => nav("/login")}>Log In</button>
      <button onClick={() => nav("/register")}>Register </button>
    </>
  );
};

export default Home;
