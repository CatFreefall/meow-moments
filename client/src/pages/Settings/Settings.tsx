import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";
import sendConfirmationEmail from "../../util/sendConfirmationEmail";
import ResetPasswordButton from "../auth/Login/components/ForgotPasswordButton";

// TODO: make this route conditionally accessible
// TODO: create a toast notifying the user that the verification email has bee nsent
const Settings = () => {
  const username = document.cookie.split(";")[0].split("=")[1];
  const verificationStatus = document.cookie.split(";")[1].split("=")[1];

  return (
    <section className="mt-16">
      <ResetPasswordButton
        emailUsername={username}
        text="Want to change your password? Click me!"
      />
      <MenuSectionDivider />
      Verification Status:{" "}
      {verificationStatus === "true" ? "Verified" : "Unverified"}
      {verificationStatus === "true" ? null : (
        <button onClick={() => sendConfirmationEmail(username)}>
          Send a verification Email!
        </button>
      )}
    </section>
  );
};

export default Settings;
