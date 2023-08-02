import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginButton from "../../components/common/LoginButton";
import { useAuthContext } from "../../util/AuthState";

//TODO: change this fetch request to point to /login instead of /confirm. a message
// will appear on the page saying that the user has confirmed their email
const Confirm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    authentication: [authenticated],
  } = useAuthContext();

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
        .then((res) => setIsVerified(res))
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [token, username, isVerified]);

  // if the user is logged in, remove the unverified cookie and set a new verified cookie.
  const UserVerified = () => {
    if (authenticated) {
      document.cookie =
        "verified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "verified=true; path=/;";
    }
    console.log(authenticated);
    return <div>User verified.</div>;
  };

  if (loading) {
    return null;
  } else {
    return (
      <section>
        {isVerified ? (
          <UserVerified />
        ) : (
          <div>User not verified. Please request a new verification link</div>
        )}
        <LoginButton />
      </section>
    );
  }
};

export default Confirm;
