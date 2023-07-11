import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

const Login = () => {
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = () => {
    console.log("username: ", emailUsername, "password: ", password);
    let jsonBody: string;

    // determining if the user is signing in with their email or username
    validate(emailUsername)
      ? (jsonBody = JSON.stringify({
          username: null,
          email: emailUsername,
          password: password,
        }))
      : (jsonBody = JSON.stringify({
          username: emailUsername,
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

  // this should also
  // redirect the user to the login page after they change their password.
  //TODO: have the user enter their username in the box before fetching the endpoint
  const forgotPassword = () => {
    let jsonBody: string;

    validate(emailUsername)
      ? (jsonBody = JSON.stringify({
          username: null,
          email: emailUsername,
        }))
      : (jsonBody = JSON.stringify({
          username: emailUsername,
          email: null,
        }));

    fetch("/password-reset-req", {
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
          placeholder="Email/Username"
          value={emailUsername}
          onChange={(e) => setEmailUsername(e.target.value)}
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
