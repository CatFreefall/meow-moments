import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const nav = useNavigate();
  return <button onClick={() => nav("/")}>Home</button>;
};

export default HomeButton;
