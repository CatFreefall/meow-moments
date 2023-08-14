import { useState } from "react";
import { validate } from "email-validator";

import EmailVerificationSent from "../../../components/toasts/EmailVerificationSent";
import EmailInput from "./components/EmailInput";
import Footer from "../../../components/common/Footer";
import ToLogin from "./components/ToLogin";
import RegistrationDivider from "./components/RegistrationDivider";
import RegisterButton from "./components/RegisterButton";
import UsernameInput from "./components/UsernameInput";
import PasswordInputBoxes from "./components/PasswordInputBoxes";
import RegistrationImage from "./components/RegistrationImage";
import ErrorMessage from "./components/ErrorMessage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // getting the account creation date to be stored in the database
  const date: Date = new Date();
  const currentDate: String =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

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

  return (
    <section className="h-screen flex flex-col justify-between">
      {userCreated ? <EmailVerificationSent /> : <></>}
      <RegistrationImage />

      <form className="flex flex-col items-center">
        <UsernameInput
          username={username}
          setUsername={setUsername}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <EmailInput setEmail={setEmail} errorMessage={errorMessage} />
        <PasswordInputBoxes
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </form>
      <ErrorMessage errorMessage={errorMessage} />
      <RegisterButton
        email={email}
        register={register}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <RegistrationDivider />
      <ToLogin />
      <Footer />
    </section>
  );
};

export default Register;
