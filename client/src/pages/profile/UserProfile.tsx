import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

type userDetailsType = {
  account_creation_date: Date;
  last_posted_date: Date;
  biography: String;
  account_status: Boolean;
  profile_picture: String;
};

const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState<userDetailsType>(
    {} as userDetailsType
  );

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
      <img
        src={`${userDetails.profile_picture}`}
        alt=""
        className="rounded-full hover:opacity-70 hover:cursor-pointer"
      />
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
      Posts: 
    </section>
  );
};

export default UserProfile;
