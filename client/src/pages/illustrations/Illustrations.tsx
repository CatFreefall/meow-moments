import AuthWrapper from "../../components/common/AuthWrapper";
import LogoutButton from "../../components/common/LogoutButton";

const IllustrationComponents = () => {
  return (
    <div>
      Illustrations
      <LogoutButton />
    </div>
  );
};

const Illustrations = () => {
  return <div>{AuthWrapper(IllustrationComponents)}</div>;
};

export default Illustrations;
