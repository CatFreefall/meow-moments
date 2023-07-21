import { Navigate } from "react-router-dom";

// upon visiting a page that requires authorization, the user will be redirected
// to the login page if they do not have the valid cookies and a toast will notify
// them to login or register.
const UnauthorizedPage = () => {
  return <Navigate to="/login" />;
};

export default UnauthorizedPage;
