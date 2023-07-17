import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
  const nav = useNavigate();
  return <button onClick={() => nav("/register")}></button>;
};

export default RegisterButton;
