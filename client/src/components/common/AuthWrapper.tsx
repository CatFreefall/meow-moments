import { useEffect, useState } from "react";

// TODO: check for cookies and redirect to login if they DNE
// TODO: If they do exist, send their values to server and verify.
// TODO: include general page structure that applies to all wrapped pages here
const AuthWrapper = (Component: () => JSX.Element) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthRequest = () => {
      try {
        fetch("authorization-request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => setAuthorized(res.status === 200 ? true : false))
          .then(() => setLoading(false));
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchAuthRequest();
  }, []);

  if (loading) return <></>;
  else return authorized ? <Component /> : <></>;
};

export default AuthWrapper;
