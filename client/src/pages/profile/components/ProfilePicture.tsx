type ProfilePictureProps = {
  profileURL: string;
};

const ProfilePicture = ({ profileURL }: ProfilePictureProps) => {
  return (
    <section className="w-screen flex flex-col items-center">
      <img
        src={`${profileURL}`}
        alt=""
        className="rounded-full w-60 h-60 border-2"
      />
    </section>
  );
};

export default ProfilePicture;
