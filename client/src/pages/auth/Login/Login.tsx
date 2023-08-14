import { useState } from "react";

import ResetPasswordButton from "../../../components/common/ResetPasswordButton";
import PasswordChangeEmailSent from "../../../components/toasts/PasswordChangeEmailSent";
import EmailUsernameInput from "./components/UsernameEmailInput";
import PasswordInput from "./components/PasswordInput";
import Footer from "../../../components/common/Footer";
import LoginImage from "./components/LoginImage";
import LoginDivider from "./components/LoginDivider";
import ToRegistration from "./components/ToRegistration";
import LoginButton from "./components/LoginButton";

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
          <LoginButton
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
      <ToRegistration />
      <Footer />
    </section>
  );
};

export default Login;
