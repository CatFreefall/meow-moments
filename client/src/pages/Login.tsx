import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  return (
    <>
      <button onClick={() => nav("/")}>Home Page</button>
      <button onClick={() => nav("/register")}>Register</button>
    </>
  );
}

export default Login;
