import { useState } from "react";
import { useParams } from "react-router-dom";

//TODO: provide the user with minimum password requirements
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const token = useParams().token;
  const user = useParams().user;

  const changePassword = (e: any) => {
    e.preventDefault();

    newPassword === confirmNewPassword
      ? fetch(`/password-reset/${user}/${token}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        })
      : console.log("Passwords do not match");
  };

  return (
    <section className="mt-16">
      <form onSubmit={changePassword}>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        ></input>
        <button onClick={changePassword}>Change Password</button>
      </form>
    </section>
  );
};

export default ResetPassword;
