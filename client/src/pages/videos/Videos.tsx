import AuthWrapper from "../../components/common/AuthWrapper";
import LogoutButton from "../../components/common/LogoutButton";

const VideoComponents = () => {
  return (
    <div>
      Videos
      <LogoutButton />
    </div>
  );
};

const Photos = () => {
  return <div>{AuthWrapper(VideoComponents)}</div>;
};

export default Photos;
