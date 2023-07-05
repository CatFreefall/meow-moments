import { useNavigate } from "react-router";

function Home() {
  const nav = useNavigate();

  return (
    <>
      <button onClick={() => nav("/login")}>Log In</button>
      <button onClick={() => nav("/register")}>Register </button>
    </>
  );
}

export default Home;
