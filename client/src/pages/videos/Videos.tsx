import AuthWrapper from "../../components/common/AuthWrapper";

const VideoComponents = () => {
  return <div>Illustrations</div>;
};

const Photos = () => {
  return <div>{AuthWrapper(VideoComponents)}</div>;
};

export default Photos;
