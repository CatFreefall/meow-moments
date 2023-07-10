import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";

//TODO: change this fetch request to point to /login instead of /confirm. a message
// will appear on the page saying that the user has confirmed their email
const Confirm = () => {
  const nav = useNavigate();
  // getting the username and token from the url and passing them to the server through url
  const { username, token } = useParams();
  useEffect(() => {
    fetch(`/confirm/${username}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return (
    <div>
      User verified! You may now login.
      <button onClick={() => nav("/login")}>Login</button>
    </div>
  );
};

export default Confirm;
