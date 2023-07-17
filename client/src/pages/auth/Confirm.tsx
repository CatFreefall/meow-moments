import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginButton from "../../components/LoginButton";

//TODO: change this fetch request to point to /login instead of /confirm. a message
// will appear on the page saying that the user has confirmed their email
const Confirm = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // getting the username and token from the url and passing them to the server through url
  const { username, token } = useParams();
  useEffect(() => {
    try {
      fetch(`/confirm/${username}/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setVerified(res))
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [token, username, verified]);

  if (loading) {
    return null;
  } else {
    return (
      <div>
        {verified ? (
          <div>User verified.</div>
        ) : (
          <div>User not verified. Please request a new verification link</div>
        )}
        <LoginButton />
      </div>
    );
  }
};

export default Confirm;
