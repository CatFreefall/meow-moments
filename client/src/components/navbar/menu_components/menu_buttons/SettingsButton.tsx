import DropdownlessButton from "./DropdownlessButton";

const SettingsButton = () => {
  return (
    <DropdownlessButton
      navPath="/settings"
      iconPath="/assets/icons/settings-icon.webp"
      buttonName="Settings"
    />
  );
};

export default SettingsButton;
