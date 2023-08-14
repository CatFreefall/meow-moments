import { validate } from "email-validator";

type RegisterButtonProps = {
  email: string;
  register: () => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const RegisterButton = ({
  email,
  register,
  errorMessage,
  setErrorMessage,
}: RegisterButtonProps) => {
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

  return (
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
  );
};

export default RegisterButton;
