import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();

  return (
    <section className="mt-16">
      {username}, Account Creation Date, Number of Likes, Last Posted,
      Biography, Posts,
    </section>
  );
};

export default UserProfile;
