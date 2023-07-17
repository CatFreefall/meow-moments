import { useNavigate } from "react-router-dom";

// this component navigates the user to the login page. It does not log the user in.
const LoginButton = () => {
  const nav = useNavigate();
  return <button onClick={() => nav("/login")}>Login</button>;
};

export default LoginButton;
