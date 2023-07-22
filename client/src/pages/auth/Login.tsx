import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

const Login = () => {

  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();

    // determining if the user is signing in with their email or username
    try {
      const jsonBody = validate(emailUsername)
        ? JSON.stringify({
            username: null,
            email: emailUsername,
            password: password,
          })
        : JSON.stringify({
            username: emailUsername,
            email: null,
            password: password,
          });

      await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      })
        .then((res) => {
          if (res.status === 201) {
            nav("/");
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  // this should also
  // redirect the user to the login page after they change their password.
  //TODO: have the user enter their username in the box before fetching the endpoint
  const forgotPassword = async () => {
    const jsonBody = validate(emailUsername)
      ? JSON.stringify({
          username: null,
          email: emailUsername,
        })
      : JSON.stringify({
          username: emailUsername,
          email: null,
        });

    await fetch("/password-reset-req", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    }).catch((e) => console.log(e));
  };

  return (
    <>
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
    </>
  );
};

export default Login;
