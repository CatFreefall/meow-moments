import { useNavigate } from "react-router";
import { useState } from "react";
import { validate } from "email-validator";

const Register = () => {
  const nav = useNavigate();

  // TODO: utilize these states later to check for correct input after each change in the text box
  // TODO: also utilize username and email to check if they are already in the database on change
  // instead of having the user submitting to find out
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // getting the account creation date to be stored in the database
  const date: Date = new Date();
  const currentDate: String =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  const register = () => {
    // validating the email using the email-validator lib before querying the database.
    validate(email)
      ? fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            account_creation_date: currentDate,
          }),
        })
          .then((res) => res.json())
          .catch((e) => console.log(e))
      : console.log("invalid email");
  };

  return (
    <>
      <button onClick={() => nav("/login")}>Login</button>
      <button onClick={() => nav("/")}>Home</button>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </form>
      <button onClick={register}>Click to register</button>
    </>
  );
};

export default Register;
