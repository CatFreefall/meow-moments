import TrendingIcon from "./TrendingIcon";

type TrendingButtonProps = {
  collapseMenu: () => void;
  toggleDropdown: () => void;
  nav: (path: string) => void;
};

const TrendingButton = ({
  collapseMenu,
  toggleDropdown,
  nav,
}: TrendingButtonProps) => {
  return (
    <button
      className="flex items-center mobile-menu-element w-full px-3 py-1"
      onClick={() => {
        nav("/illustrations/trending");
        collapseMenu();
        toggleDropdown();
      }}
    >
      <TrendingIcon />
      Trending
    </button>
  );
};

export default TrendingButton;
