import { useState, useEffect } from "react";
import { validate } from "email-validator";

import EmailVerificationSent from "../../../components/toasts/EmailVerificationSent";
import Navbar from "../../../components/navbar/Navbar";
import LoginButton from "../../../components/common/LoginButton";
import EmailInputBox from "./EmailInputBox";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [email, setEmail] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // getting the account creation date to be stored in the database
  const date: Date = new Date();
  const currentDate: String =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  //TODO: check existence of username and email with useStates
  const register = async () => {
    // validating the email using the email-validator lib before querying the database.
    try {
      validate(email)
        ? await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
              account_creation_date: currentDate,
            }),
          })
            .then(() => setUserCreated(true))
            .catch((e) => console.log(e))
        : setErrorMessage("Invalid Email.");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (username.length > 0) {
      fetch(`/validate-username/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          data === "Username Already Exists."
            ? setErrorMessage(data)
            : setErrorMessage("")
        )
        .catch((e) => console.log(e));
    }
  }, [username]);

  const validateEmail = () => {
    if (validate(email))
      fetch(`/validate-email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === "Email Already Exists.") {
            setErrorMessage(data);
          } else {
            setErrorMessage("");
            register();
          }
        })
        .catch((e) => console.log(e));
    else setErrorMessage("Invalid Email.");
  };

  useEffect(() => {
    if (
      (password.length > 0 &&
        confirmPassword.length > 0 &&
        errorMessage === "") ||
      errorMessage === "Passwords do not match."
    ) {
      password === confirmPassword
        ? setPasswordsMatch(true)
        : setPasswordsMatch(false);
      setErrorMessage(passwordsMatch ? "" : "Passwords do not match.");
    }
  }, [password, confirmPassword, passwordsMatch, errorMessage]);

  return (
    <div className="h-screen">
      <Navbar />
      {userCreated ? <EmailVerificationSent /> : <></>}
      <div className="flex flex-col h-full justify-evenly">
        <img
          src="/assets/images/cat-16.webp"
          alt=""
          className="w-5/12 self-center pt-16"
        ></img>
        <div>
          <form className="flex flex-col items-center">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mb-1 ${
                errorMessage.indexOf("Username") !== -1
                  ? "input-box-error"
                  : "input-box"
              }`}
            ></input>
            <EmailInputBox setEmail={setEmail} errorMessage={errorMessage}/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mb-1 ${
                errorMessage.indexOf("Passwords") !== -1
                  ? "input-box-error"
                  : "input-box"
              }`}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={` ${
                errorMessage.indexOf("Passwords") !== -1
                  ? "input-box-error"
                  : "input-box"
              }`}
            ></input>
          </form>
          <div className="flex flex-col items-center h-2 text-xs text-rose-400">
            {errorMessage}
          </div>
          <div className="flex flex-col items-center mt-6">
            <button
              onClick={() => {
                validateEmail();
              }}
              className="button rounded-lg w-3/5 disabled:bg-darkblue"
              disabled={
                errorMessage === "Passwords do not match." ||
                errorMessage === "Username Already Exists."
                  ? true
                  : false
              }
            >
              Register
            </button>
          </div>
        </div>
        <img
          src="/assets/images/cat-divider.webp"
          alt=""
          className="self-center w-56"
        ></img>
        <div className="text-xs flex justify-center items-center">
          <div className="pr-1">Have an account?</div>
          <div className="pl-1">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
