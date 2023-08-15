import { useNavigate } from "react-router-dom";

type SubmitProfileChangeButtonProps = {
  username: string;
  newProfilePicture: React.MutableRefObject<HTMLInputElement | null>;
  newBio: React.MutableRefObject<HTMLTextAreaElement | null>;
};

const SubmitProfileChangeButton = ({
  username,
  newProfilePicture,
  newBio,
}: SubmitProfileChangeButtonProps) => {
  const nav = useNavigate();

  const changeProfile = () => {
    const formData = new FormData();
    formData.append(
      "new-profile-picture",
      newProfilePicture.current?.files?.[0]!
    );
    formData.append("newBio", newBio.current?.value!);

    fetch(`/change-profile`, {
      method: "POST",
      body: formData,
    })
      .then(() => nav(`/profile/${username}`))
      .then(() => window.location.reload());
  };

  return (
    <button className="button w-fit" onClick={() => changeProfile()}>
      Save
    </button>
  );
};

export default SubmitProfileChangeButton;
