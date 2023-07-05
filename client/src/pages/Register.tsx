import { useNavigate } from "react-router";

function Register() {
  const nav = useNavigate();

  return (
    <>
      <button onClick={() => nav("/login")}>Login</button>
      <button onClick={() => nav("/")}>Home</button>
    </>
  );
}

export default Register;
