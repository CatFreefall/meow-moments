import LogoutButton from "../../components/common/LogoutButton";
import UnauthorizedPage from "../auth/UnauthorizedPage";

const PhotosComponents = () => {
  return (
    <div>
      Photos
      <LogoutButton />
    </div>
  );
};

type PhotosProps = {
  isAuthorized: Boolean;
};

const Photos = ({ isAuthorized }: PhotosProps): JSX.Element => {
  if (isAuthorized) {
    return <PhotosComponents />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default Photos;
