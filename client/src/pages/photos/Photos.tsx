import AuthWrapper from "../../components/common/AuthWrapper";
import LogoutButton from "../../components/common/LogoutButton";

const PhotoComponents = () => {
  return (
    <div>
      Photos
      <LogoutButton />
    </div>
  );
};

const Photos = () => {
  return <div>{AuthWrapper(PhotoComponents)}</div>;
};

export default Photos;
