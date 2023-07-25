type UsernameEmailInputProps = {
  setEmailUsername: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
}

const EmailUsernameInput = ({ setEmailUsername, errorMessage }: UsernameEmailInputProps) => {

  return (
    <input
              type="text"
              placeholder="Email/Username"
              onChange={(e) => setEmailUsername(e.target.value)}
              className={`mb-3 ${
                errorMessage.indexOf("Username") !== -1
                  ? "input-box-error"
                  : "input-box"
              }`}
            ></input>
  )
}

export default EmailUsernameInput