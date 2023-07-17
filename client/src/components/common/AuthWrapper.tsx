import { useEffect, useState } from "react";

// most pages on this site are displayed conditionally based on if the
// user is authorized or not (meaning that they are logged in and
// have the required VALID cookies). this component is passed though
// those pages to check for valid user authorization. for example, if an
// unauthorized user tries to visit /illustrations, they will be redirected
// to the login page.
type AuthWrapperProps = {
  Component: React.ComponentType<any>;
};

const AuthWrapper = ({ Component }: AuthWrapperProps) => {
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

  if (loading) return null;
  else return <Component isAuthorized={authorized} />;
};

export default AuthWrapper;
