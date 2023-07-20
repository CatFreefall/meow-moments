
import UnauthorizedPage from "../auth/UnauthorizedPage";

const PhotosComponents = () => {
  return (
    <div>
      Photos
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
