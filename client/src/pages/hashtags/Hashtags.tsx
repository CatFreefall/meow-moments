import UnauthorizedPage from "../auth/UnauthorizedPage";
import { useAuthContext } from "../../util/AuthState";

const HashtagsComponents = () => {
  return <div>Hashtags</div>;
};

const Hashtags = () => {
  const [authState] = useAuthContext();

  if (authState === "logged out") {
    return <UnauthorizedPage />;
  } else if (authState === "logged in") {
    return <HashtagsComponents />;
  } else if (authState === "unverified") {
    return <UnauthorizedPage />;
  } else return <div>Something went wrong</div>;
};

export default Hashtags;
