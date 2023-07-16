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

  //TODO: check existence of username and email with useStates
  const register = async (e: any) => {
    e.preventDefault();
    // validating the email using the email-validator lib before querying the database.
    try {
      validate(email)
        ? await fetch("/register", {
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
            .then((res) => {
              if (res.status === 201) nav("/login");
            })
            .catch((e) => console.log(e))
        : console.log("invalid email");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button onClick={() => nav("/login")}>Login</button>
      <button onClick={() => nav("/")}>Home</button>
      <form onSubmit={register}>
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
        <button onClick={register}>Click to register</button>
      </form>
    </>
  );
};

export default Register;
