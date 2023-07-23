import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";
import Navbar from "../../components/navbar/Navbar";
import RegisterButton from "../../components/common/RegisterButton";

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
            window.location.reload();
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
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col h-full justify-evenly">
        <img
          src="/assets/images/cat-16.webp"
          alt=""
          className="w-5/12 self-center pt-16"
        ></img>
        <div>
          <form onSubmit={login} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Email/Username"
              value={emailUsername}
              onChange={(e) => setEmailUsername(e.target.value)}
              className="input-box mb-3"
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            ></input>
          </form>
          <div className="flex flex-col items-center mt-6">
            <button onClick={login} className="button rounded-lg w-3/5">
              Submit
            </button>
            <button onClick={forgotPassword} className="self-center text-xs">
              Forgot Password?
            </button>
          </div>
        </div>
        <img
          src="/assets/images/cat-divider.webp"
          alt=""
          className="self-center w-3/4"
        ></img>
        <div className="text-xs flex justify-center items-center">
          <div className="pr-1">Don't have an account?</div>
          <div className="pl-1">
            <RegisterButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
