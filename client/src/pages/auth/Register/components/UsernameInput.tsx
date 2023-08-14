import { useEffect } from "react";

type UsernameInputProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UsernameInput = ({
  username,
  setUsername,
  errorMessage,
  setErrorMessage,
}: UsernameInputProps) => {
  useEffect(() => {
    if (username.length > 0) {
      fetch(`/validate-username/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          data === "Username Already Exists."
            ? setErrorMessage(data)
            : setErrorMessage("")
        )
        .catch((e) => console.log(e));
    }
  }, [username, setErrorMessage]);

  return (
    <input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className={`mb-1 ${
        errorMessage.indexOf("Username") !== -1
          ? "input-box-error"
          : "input-box"
      }`}
    ></input>
  );
};

export default UsernameInput;
