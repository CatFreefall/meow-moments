import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

import LoginButton from "../../../components/common/LoginButton";
import UserVerified from "./UserVerified";

//TODO: change this fetch request to point to /login instead of /confirm. a message
// will appear on the page saying that the user has confirmed their email
const VerificationPage = () => {
  const userVerified = useRef(false);

  // getting the username and token from the url and passing them to the server through route params
  const { username, token } = useParams();
  useEffect(() => {
    fetch(`/confirm/${username}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (userVerified.current = res))
      .catch((err) => console.log(err));
  }, [token, username]);

  return (
    <section>
      {userVerified ? (
        <UserVerified />
      ) : (
        <div>User not verified. Please request a new verification link</div>
      )}
      <LoginButton />
    </section>
  );
};

export default VerificationPage;
