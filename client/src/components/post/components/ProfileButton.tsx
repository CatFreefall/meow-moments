import { useNavigate } from "react-router-dom";

type ProfileButtonProps = {
  username: string;
  profilePictureURL: string;
};

const ProfileButton = ({ username, profilePictureURL }: ProfileButtonProps) => {
  const nav = useNavigate();

  return (
    <button
      onClick={() => nav(`/profile/${username}`)}
      className="flex items-center"
    >
      <img
        src={profilePictureURL}
        alt=""
        className="rounded-full w-8"
      />
      {username}
    </button>
  );
};

export default ProfileButton;
