import LogoutButton from "../../components/common/LogoutButton";
import UnauthorizedPage from "../auth/UnauthorizedPage";

const IllustrationsComponents = () => {
  return (
    <div>
      Illustrations Authorized
      <LogoutButton />
    </div>
  );
};

type IllustrationsProps = {
  isAuthorized: Boolean;
};

const Illustrations = ({ isAuthorized }: IllustrationsProps): JSX.Element => {
  if (isAuthorized) {
    return <IllustrationsComponents />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default Illustrations;
