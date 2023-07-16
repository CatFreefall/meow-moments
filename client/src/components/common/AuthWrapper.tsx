import { useEffect, useState } from "react";

// TODO: check for cookies and redirect to login if they DNE
// TODO: If they do exist, send their values to server and verify.
// TODO: include general page structure that applies to all wrapped pages here
const AuthWrapper = (Component: any) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      fetch("/auth-request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        // .then((res) =>
        //   res === "true" ? setAuthorized(true) : setAuthorized(false)
        // )
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  });

  return <div>{authorized ? <Component /> : null}</div>;
};

export default AuthWrapper;
