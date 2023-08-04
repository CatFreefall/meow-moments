import { useRef } from "react";

type ProfilePictureProps = {
  profileURL: string;
  username: string;
};

// TODO: display this component conditionally based on whether the user is viewing
// their own profile or someone else's

const ProfilePicture = ({ profileURL, username }: ProfilePictureProps) => {
  const newProfilePicture = useRef<HTMLInputElement>(null);

  const changeProfilePicture = () => {
    const formData = new FormData();
    formData.append(
      "new-profile-picture",
      newProfilePicture.current?.files?.[0]!
    );

    fetch(`/change-profile-picture`, {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then(() => window.location.reload());
  };

  return (
    <section className="w-screen flex flex-col items-center">
      <img src={`${profileURL}`} alt="" className="rounded-full w-60 h-auto" />
      <input
        type="file"
        accept="image/*, video/*"
        id="change-profile-picture-button"
        className="w-fit text-sm hidden"
        ref={newProfilePicture}
        onChange={() => changeProfilePicture()}
      ></input>
      <label
        htmlFor="change-profile-picture-button"
        className="hover:cursor-pointer"
      >
        Change Profile Picture
      </label>
    </section>
  );
};

export default ProfilePicture;
