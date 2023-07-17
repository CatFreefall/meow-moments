import LogoutButton from "../../components/common/LogoutButton";
import UnauthorizedPage from "../auth/UnauthorizedPage";

const VideosComponents = () => {
  return (
    <div>
      Videos
      <LogoutButton />
    </div>
  );
};

type VideosProps = {
  isAuthorized: Boolean;
};

const Videos = ({ isAuthorized }: VideosProps): JSX.Element => {
  if (isAuthorized) {
    return <VideosComponents />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default Videos;
