import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserPosts from "./components/UserPosts";
import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";
import ProfilePicture from "./components/ProfilePicture";
import userDetailsType from "./userDetailsType";

// TODO: MEMOIZE THIS
const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState<userDetailsType>(
    {} as userDetailsType
  );
  const nav = useNavigate();

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
    <section className="mt-16">
      <ProfilePicture
        profileURL={userDetails.profile_picture as string}
      />
      <MenuSectionDivider />
      {username}
      <br />
      {`Account Creation Date: ${userDetails.account_creation_date}`}
      <br />
      {`Verified: ${userDetails.account_status}`}
      <br />
      {`Last Posted on: ${userDetails.last_posted_date}`}
      <br />
      {`Biography: ${userDetails.biography}`}
      <br />
      <button
        className="button w-fit"
        onClick={() => nav(`/profile/${username}/change-profile`)}
      >
        Change Profile
      </button>
      <MenuSectionDivider />
      Posts:
      <UserPosts username={username as String} />
    </section>
  );
};

export default UserProfile;
