type PasswordInputProps = {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
};

const PasswordInput = ({ setPassword, errorMessage }: PasswordInputProps) => {
  return (
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      className={`${
        errorMessage.indexOf("Password") !== -1
          ? "input-box-error"
          : "input-box"
      }`}
    ></input>
  );
};

export default PasswordInput;
