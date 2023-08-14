import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserPosts from "./components/UserPosts";
import ProfilePicture from "./components/ProfilePicture";
import userDetailsType from "./userDetailsType";
import Footer from "../../components/common/Footer";
import ChangeProfileButton from "./components/ChangeProfileButton";
import { useAuthContext } from "../../hooks/useAuthState";

const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState<userDetailsType>(
    {} as userDetailsType
  );

  const {
    authentication: [authenticated],
  } = useAuthContext();

  useEffect(() => {
    try {
      fetch(`/profile/${username}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUserDetails(data));
    } catch (err) {
      console.error(err);
    }
  }, [username]);

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="mt-16 w-screen text-center">
        <ProfilePicture profileURL={userDetails.profile_picture as string} />
        {username}
        <br />
        {`Account Creation Date: ${userDetails.account_creation_date}`}
        <br />
        {`Verified: ${userDetails.account_status}`}
        <br />
        {`Last Posted on: ${userDetails.last_posted_date}`}
        <br />
        {`Biography: ${userDetails.biography}`}
        <div className="w-screen flex justify-center mb-2">
          {authenticated && (
            <ChangeProfileButton username={username as string} />
          )}
        </div>
        Posts
        <UserPosts username={username as string} />
      </main>
      <Footer />
    </section>
  );
};

export default UserProfile;
