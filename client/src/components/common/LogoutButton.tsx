import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const nav = useNavigate();

  const logout = async () => {
    await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    nav("/");
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
