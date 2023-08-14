import { useState } from "react";

import ResetPasswordButton from "../../../components/common/ResetPasswordButton";
import PasswordChangeEmailSent from "../../../components/toasts/PasswordChangeEmailSent";
import EmailUsernameInput from "./components/UsernameEmailInput";
import PasswordInput from "./components/PasswordInput";
import Footer from "../../../components/common/Footer";
import LoginImage from "./components/LoginImage";
import LoginDivider from "./components/LoginDivider";
import RegistrationContainer from "./components/RegistrationContainer";
import SubmitButton from "./components/SubmitButton";

const Login = () => {
  const [emailUsername, setEmailUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <section className="h-screen flex flex-col justify-between">
      {forgotPasswordClicked ? <PasswordChangeEmailSent /> : null}
      <LoginImage />
      <main>
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
          <SubmitButton
            emailUsername={emailUsername}
            password={password}
            setErrorMessage={setErrorMessage}
          />
          <h6 onClick={() => setForgotPasswordClicked(true)}>
            <ResetPasswordButton
              emailUsername={emailUsername}
              text="Forgot Password?"
            />
          </h6>
        </div>
      </main>
      <LoginDivider />
      <RegistrationContainer />
      <Footer />
    </section>
  );
};

export default Login;
