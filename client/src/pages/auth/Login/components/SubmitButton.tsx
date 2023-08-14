import { validate } from "email-validator";
import { useNavigate } from "react-router-dom";

type SubmitButtonProps = {
  emailUsername: string;
  password: string;
  setErrorMessage: (message: string) => void;
};

const SubmitButton = ({
  emailUsername,
  password,
  setErrorMessage,
}: SubmitButtonProps) => {
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
    <button onClick={login} className="button rounded-lg w-3/5">
      Submit
    </button>
  );
};

export default SubmitButton;
