import AccountNotVerified from "../components/toasts/AccountNotVerified";
import { useAuthContext } from "../util/AuthState";

const Home = () => {
  const {
    authentication: [authenticated],
  } = useAuthContext();

  return (
    <>
      <div>
        <AccountNotVerified />
        Homepage contents go here:
        <button
          onClick={() => {
            console.log(authenticated);
          }}
        >
          a
        </button>
      </div>
    </>
  );
};

export default Home;
