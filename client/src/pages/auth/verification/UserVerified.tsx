import { useAuthContext } from "../../../hooks/useAuthState";

// if the user is logged in, remove the unverified cookie and set a new verified cookie.
const UserVerified = () => {
  const {
    authentication: [authenticated],
  } = useAuthContext();

  if (authenticated) {
    document.cookie =
      "verified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "verified=true; path=/;";
  }
  return <div className="mt-16">User verified!</div>;
};

export default UserVerified;
