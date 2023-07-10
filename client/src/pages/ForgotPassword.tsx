import { useState } from "react";
import { useParams } from "react-router-dom";

//TODO: provide the user with minimum password requirements
const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useParams().token;

  const changePassword = () => {
    password === confirmPassword
      ? fetch("/password-reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        })
          .then((res) => res.json())
          .catch((e) => console.log(e))
      : console.log("Passwords do not match");
  };

  return (
    <>
      <form>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <form>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={changePassword}>Change Password</button>
    </>
  );
};

export default ForgotPassword;
