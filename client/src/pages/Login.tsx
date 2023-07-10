import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

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

  //TODO: add a JWT to forgot password emails so that they expire. this should also
  // redirect the user to the login page after they change their password.
  //TODO: have the user enter their username in the box before fetching the endpoint
  const forgotPassword = () => {
    validate(username)
      ? fetch("/password-reset-req", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username }),
        })
          .then((res) => res.json())
          .catch((e) => console.log(e))
      : console.log("Please enter a valid email address");
  };

  return (
    <>
      <button onClick={() => nav("/")}>Home Page</button>
      <button onClick={() => nav("/register")}>Register</button>
      <form>
        <input
          type="text"
          placeholder="Email/Username"
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
      <button onClick={forgotPassword}>Forgot Password?</button>
    </>
  );
};

export default Login;
