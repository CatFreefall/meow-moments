import { useNavigate } from "react-router";
import { useState } from "react";
import { validate } from "email-validator";

// TODO: EMAIL VALIDATION STILL NEEDED
function Register() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // getting the account creation date to be stored in the database
  const date: Date = new Date();
  const currentDate: String =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  const registerUser = () => {
    // validating the email using the email-validator lib before querying the database.
    validate(email)
      ? fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password_hash: password,
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
      <button onClick={registerUser}>Click to register</button>
    </>
  );
}

export default Register;
