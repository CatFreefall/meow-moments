import { useParams } from "react-router-dom";

//TODO: change this fetch request to point to /login instead of /confirm
const Confirm = () => {
  // getting the token from the url and passing it to the server through url
  const { token } = useParams();
  fetch(`/confirm/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return <div>Confirm</div>;
};

export default Confirm;
