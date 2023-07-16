import AuthWrapper from "../../components/common/AuthWrapper";

const PhotoComponents = () => {
  return <div>Photos</div>;
};

const Photos = () => {
  return <div>{AuthWrapper(PhotoComponents)}</div>;
};

export default Photos;
