import { validate } from "email-validator";

type ResetPasswordButtonProps = {
  emailUsername: string;
  text: string;
};

const ResetPasswordButton = ({
  emailUsername,
  text,
}: ResetPasswordButtonProps) => {
  // differentiating between the user entering in with their email or
  // username before sending the request to the server.
  const sendPasswordResetEmail = async (emailUsername: string) => {
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
    <button
      onClick={() => sendPasswordResetEmail(emailUsername)}
      className="self-center text-xs"
    >
      {text}
    </button>
  );
};

export default ResetPasswordButton;
