import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import userDetailsType from "./userDetailsType";
import Footer from "../../components/common/Footer";
import SubmitProfileChangeButton from "./components/SubmitProfileChangeButton";
import ProfilePicturePreview from "./components/ProfilePicturePreview";

const ChangeProfilePage = () => {
  const [userDetails, setUserDetails] = useState({} as userDetailsType);
  const { username } = useParams();
  const newProfilePicture = useRef<HTMLInputElement>(null);
  const newBio = useRef<HTMLTextAreaElement>(null);
  const [imageURL, setImageURL] = useState("");

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
      <main className="w-screen flex flex-col items-center mt-16">
        <img
          src={imageURL ? imageURL : userDetails.profile_picture}
          alt=""
          className="rounded-full w-60 h-60"
        />
        <ProfilePicturePreview
          setImageURL={setImageURL}
          newProfilePicture={newProfilePicture}
        />
        <label htmlFor="change-profile-picture-button">
          Change Profile Picture
        </label>
        Biography (Max 255 characters)
        <textarea
          className="w-fit bg-darkishgrey"
          defaultValue={userDetails.biography}
          ref={newBio}
        />
        <SubmitProfileChangeButton
          username={username as string}
          newProfilePicture={newProfilePicture}
          newBio={newBio}
        />
      </main>
      <Footer />
    </section>
  );
};

export default ChangeProfilePage;
