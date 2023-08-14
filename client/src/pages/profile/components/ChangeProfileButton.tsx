import { useNavigate } from "react-router-dom";

type ChangeProfileButtonProps = {
  username: string;
};

const ChangeProfileButton = ({ username }: ChangeProfileButtonProps) => {
  const nav = useNavigate();

  return (
    <button
      className="button w-fit"
      onClick={() => nav(`/profile/${username}/change-profile`)}
    >
      Change Profile
    </button>
  );
};

export default ChangeProfileButton;
