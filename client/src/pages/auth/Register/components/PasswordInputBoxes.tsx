import { useEffect, useState } from "react";

type PasswordInputBoxesProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordInputBoxes = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMessage,
  setErrorMessage,
}: PasswordInputBoxesProps) => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
  }, [
    password,
    confirmPassword,
    errorMessage,
    passwordsMatch,
    setErrorMessage,
  ]);

  return (
    <>
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
    </>
  );
};

export default PasswordInputBoxes;
