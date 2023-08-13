import DropdownlessButton from "./DropdownlessButton";

const PostACatButton = () => {
  return (
    <DropdownlessButton
      navPath="/post"
      iconPath="/assets/icons/post-icon.webp"
      buttonName="Post a Cat!"
    />
  );
};

export default PostACatButton;
