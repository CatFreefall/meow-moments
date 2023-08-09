import RecentIcon from "./RecentIcon";

const RecentButton = () => {
  return (
    <button
      className="flex items-center mobile-menu-element w-full px-3 py-1"
    >
      <RecentIcon />
      Recent
    </button>
  );
};

export default RecentButton;
