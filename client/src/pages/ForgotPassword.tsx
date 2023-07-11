import { useState } from "react";
import { useParams } from "react-router-dom";

//TODO: provide the user with minimum password requirements
const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const token = useParams().token;

  const changePassword = () => {
    newPassword === confirmNewPassword
      ? fetch(`/password-reset/${token}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        })
      : console.log("Passwords do not match");
  };

  return (
    <>
      <form>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
      </form>
      <form>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={changePassword}>Change Password</button>
    </>
  );
};

export default ForgotPassword;
