import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const setUser = (e: any) => {
    setUsername(e.target.value);
  };
  const setPass = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <button onClick={() => nav("/")}>Home Page</button>
      <button onClick={() => nav("/register")}>Register</button>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={setUser}
        ></input>
      </form>
      <form>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPass}
        ></input>
      </form>
      <button
        onClick={() =>
          console.log("username: ", username, "password: ", password)
        }
      >
        Submit
      </button>
    </>
  );
}

export default Login;
