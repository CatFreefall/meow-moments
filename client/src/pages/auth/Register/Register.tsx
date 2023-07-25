import { useState, useEffect } from "react";
import { validate } from "email-validator";

import EmailVerificationSent from "../../../components/toasts/EmailVerificationSent";
import Navbar from "../../../components/navbar/Navbar";
import LoginButton from "../../../components/common/LoginButton";

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
  const register = async (e: any) => {
    e.preventDefault();
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
        : console.log("invalid email");
    } catch (e) {
      console.log(e);
    }
  };

  const [usernameExists, setUsernameExists] = useState(false);
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
          data === "Username Already Exists"
            ? setUsernameExists(true)
            : setUsernameExists(false)
        )
        .then(() => {
          setErrorMessage(usernameExists ? "Username Already Exists" : "");
        })
        .catch((e) => console.log(e));
    } else setUsernameExists(false);
  }, [username, usernameExists]);

  const [emailExists, setEmailExists] = useState(false);
  useEffect(() => {
    if (validate(email))
      fetch(`/validate-email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setErrorMessage(data === "Email Already Exists" ? data : "");
        })
        .catch((e) => console.log(e));
  }, [email]);

  useEffect(() => {
    if (password.length > 0 && confirmPassword.length > 0) {
      password === confirmPassword
        ? setPasswordsMatch(true)
        : setPasswordsMatch(false);
      setErrorMessage(passwordsMatch ? "" : "Passwords do not match");
    }
  }, [password, confirmPassword, passwordsMatch]);

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
                usernameExists ? "input-box-error" : "input-box"
              }`}
            ></input>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-3 ${
                emailExists ? "input-box-error" : "input-box"
              }`}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mb-1 ${
                passwordsMatch ? "input-box" : "input-box-error"
              }`}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={` ${passwordsMatch ? "input-box" : "input-box-error"}`}
            ></input>
          </form>
          <div className="flex flex-col items-center h-2 text-xs text-rose-400">
            {errorMessage}
          </div>
          <div className="flex flex-col items-center mt-6">
            <button
              onClick={register}
              className="button rounded-lg w-3/5 disabled:bg-darkblue"
              disabled={errorMessage !== "" ? false : true}
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
