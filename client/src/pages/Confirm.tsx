import { useParams } from "react-router-dom";
import { useEffect } from "react";

//TODO: change this fetch request to point to /login instead of /confirm. a message
// will appear on the page saying that the user has confirmed their email
const Confirm = () => {
  const test = () => {
    console.log("GFWEOUHF");
  };

  useEffect(() => {
    console.log("fart");
  }, []);

  // getting the username and token from the url and passing them to the server through url
  // const { username, token } = useParams();
  // const sendConfirmation = () => {
  //   console.log("fart");
  //   fetch(`/confirm/${username}/${token}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <div>
      Confirm<button onClick={test}>click me</button>
    </div>
  );
};

export default Confirm;
