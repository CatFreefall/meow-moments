import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

const Login = () => {
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();
    let jsonBody: string;

    // determining if the user is signing in with their email or username
    try {
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

      await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      })
        .then((res) => res.json())
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  // this should also
  // redirect the user to the login page after they change their password.
  //TODO: have the user enter their username in the box before fetching the endpoint
  const forgotPassword = async () => {
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

    await fetch("/password-reset-req", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };

  const logout = async () => {
    await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    nav("/");
  };

  return (
    <>
      <button onClick={() => nav("/")}>Home Page</button>
      <button onClick={() => nav("/register")}>Register</button>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Email/Username"
          value={emailUsername}
          onChange={(e) => setEmailUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={login}>Submit</button>
      </form>
      <button onClick={forgotPassword}>Forgot Password?</button>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Login;
