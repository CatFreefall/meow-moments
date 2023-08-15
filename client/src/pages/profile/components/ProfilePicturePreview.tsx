import { ChangeEvent } from "react";

type ProfilePicturePreviewProps = {
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  newProfilePicture: React.MutableRefObject<HTMLInputElement | null>;
};

const ProfilePicturePreview = ({
  setImageURL,
  newProfilePicture,
}: ProfilePicturePreviewProps) => {
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
    <input
      type="file"
      accept="image/*, video/*"
      id="change-profile-picture-button"
      className="w-fit text-sm hidden"
      ref={newProfilePicture}
      onChange={updateProfilePicture}
    ></input>
  );
};

export default ProfilePicturePreview;
