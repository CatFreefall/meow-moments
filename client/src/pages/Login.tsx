import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

// TODO: USERNAME/EMAIL LOGIN CHOICE USING EMAIL VALIDATOR LIB
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = () => {
    console.log("username: ", username, "password: ", password);
    let jsonBody: string;

    // determining if the user is signing in with their email or username
    validate(username)
      ? (jsonBody = JSON.stringify({
          username: null,
          email: username,
          password: password,
        }))
      : (jsonBody = JSON.stringify({
          username: username,
          email: null,
          password: password,
        }));

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
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
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </form>
      <form>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={login}>Submit</button>
    </>
  );
};

export default Login;
