import { useNavigate } from "react-router-dom";

function NoPage() {
  const nav = useNavigate();

  return (
    <>
      <div>Error 404: Not found</div>
      <button onClick={() => nav("/")}>Home</button>
      <button onClick={() => nav("/login")}>Log In</button>
      <button onClick={() => nav("/register")}>Register</button>
    </>
  );
}

export default NoPage;
