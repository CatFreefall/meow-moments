import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import userDetailsType from "./userDetailsType";
import Footer from "../../components/common/Footer";

// TODO: change this to have the pfp, username, and bio persist
// from the UserProfile page instead of fetching again (I am so lazy)
// TODO: create a toast notifying the user that their profile has been changed
// TODO: change bio text area to only accept a max of 255 chars
const ChangeProfilePage = () => {
  const [userDetails, setUserDetails] = useState({} as userDetailsType);
  const { username } = useParams();
  const newProfilePicture = useRef<HTMLInputElement>(null);
  const newBio = useRef<HTMLTextAreaElement>(null);
  const [imageURL, setImageURL] = useState("");

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

  const changeProfile = () => {
    const formData = new FormData();
    formData.append(
      "new-profile-picture",
      newProfilePicture.current?.files?.[0]!
    );
    formData.append("newBio", newBio.current?.value!);

    fetch(`/change-profile`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(() => nav(`/profile/${username}`))
      .then(() => window.location.reload());
  };

  // this function updates the image preview for the profile picture when
  // the user uploads a new inage
  const updateProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageLink = reader.result;
        setImageURL(imageLink as string);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="w-screen flex flex-col items-center mt-16">
        <img
          src={imageURL ? imageURL : userDetails.profile_picture}
          alt=""
          className="rounded-full w-60 h-60"
        />
        <input
          type="file"
          accept="image/*, video/*"
          id="change-profile-picture-button"
          className="w-fit text-sm hidden"
          ref={newProfilePicture}
          onChange={updateProfilePicture}
        ></input>
        <label htmlFor="change-profile-picture-button">
          Change Profile Picture
        </label>
        Biography (Max 255 characters)
        <textarea
          className="w-fit bg-darkishgrey"
          defaultValue={userDetails.biography}
          ref={newBio}
        />
        <button className="button w-fit" onClick={() => changeProfile()}>
          Save
        </button>
      </main>
      <Footer />
    </section>
  );
};

export default ChangeProfilePage;
