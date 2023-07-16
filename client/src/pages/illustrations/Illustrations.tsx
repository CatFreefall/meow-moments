import AuthWrapper from "../../components/common/AuthWrapper";

const IllustrationComponents = () => {
  return <div>Illustrations</div>;
};

const Illustrations = () => {
return <div>{AuthWrapper(IllustrationComponents)}</div>
}

export default Illustrations;
