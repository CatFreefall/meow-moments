import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";

import RegisterButton from "../../../components/common/RegisterButton";
import ForgotPasswordButton from "./components/ForgotPasswordButton";
import PasswordChangeEmailSent from "../../../components/toasts/PasswordChangeEmailSent";
import EmailUsernameInput from "./components/UsernameEmailInput";
import PasswordInput from "./components/PasswordInput";

const Login = () => {
  const [emailUsername, setEmailUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userEvent, setUserEvent] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

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
        .then((res) => res.json())
        .then((res) => {
          if (res === "Login successful!") {
            console.log(res);
            nav("/");
            window.location.reload();
          } else return res;
        })
        .then((data) => setErrorMessage(data))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="h-screen">
      {userEvent ? <PasswordChangeEmailSent /> : null}
      <section className="flex flex-col h-full justify-evenly">
        <img
          src="/assets/images/cat-16.webp"
          alt=""
          className="w-5/12 self-center mt-16"
        ></img>
        <div>
          <div className="flex flex-col items-center">
            <EmailUsernameInput
              setEmailUsername={setEmailUsername}
              errorMessage={errorMessage}
            />
            <PasswordInput
              setPassword={setPassword}
              errorMessage={errorMessage}
            />
          </div>
          <div className="flex flex-col items-center h-2 text-xs text-rose-400">
            {errorMessage}
          </div>
          <div className="flex flex-col items-center mt-6">
            <button onClick={login} className="button rounded-lg w-3/5">
              Submit
            </button>
            <div onClick={() => setUserEvent(true)}>
              <ForgotPasswordButton emailUsername={emailUsername} />
            </div>
          </div>
        </div>
        <img
          src="/assets/images/cat-divider.webp"
          alt=""
          className="self-center w-56"
        ></img>
        <div className="text-xs flex justify-center items-center">
          <div className="pr-1">Don't have an account?</div>
          <div className="pl-1">
            <RegisterButton />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
