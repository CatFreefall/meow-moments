import { useNavigate } from "react-router";
import { useContext } from "react";
import { useAuthContext } from "../util/AuthState";

const Home = () => {
  const [authState, setAuthState] = useAuthContext();

  const nav = useNavigate();

  return (
    <>
      <div>Homepage contents go here:
        <button onClick={() => {
          setAuthState("logged in");
          console.log(authState);
        }}>a</button>
      </div>
    </>
  );
};

export default Home;
