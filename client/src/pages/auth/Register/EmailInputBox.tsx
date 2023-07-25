type EmailInputBoxProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
};

const EmailInputBox = ({ setEmail, errorMessage }: EmailInputBoxProps) => {
  return (
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      className={`mb-3 ${
        errorMessage.indexOf("Email") !== -1 ? "input-box-error" : "input-box"
      }`}
    ></input>
  );
};

export default EmailInputBox;
