import RecentIcon from "./RecentIcon";

type RecentButtonProps = {
  collapseMenu: () => void;
  toggleDropdown: () => void;
  nav: (path: string) => void;
};

const RecentButton = ({
  collapseMenu,
  toggleDropdown,
  nav,
}: RecentButtonProps) => {
  return (
    <button
      className="flex items-center mobile-menu-element w-full px-3 py-1"
      onClick={() => {
        nav("/illustrations");
        collapseMenu();
        toggleDropdown();
      }}
    >
      <RecentIcon />
      Recent
    </button>
  );
};

export default RecentButton;
