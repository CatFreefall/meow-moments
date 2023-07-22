import UnauthorizedPage from "../auth/UnauthorizedPage";
import { useAuthContext } from "../../util/AuthState";

const HashtagsComponents = () => {
  return <div>Hashtags</div>;
};

const Hashtags = () => {
  const {authentication: [authenticated]} = useAuthContext();

  if (authenticated === true) {
    return <UnauthorizedPage />;
  } else if (authenticated === false) {
    return <HashtagsComponents />;
  } else if (authenticated === "unverified") {
    return <UnauthorizedPage />;
  } else return <div>Something went wrong</div>;
};

export default Hashtags;
