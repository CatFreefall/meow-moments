import TrendingIcon from "./TrendingIcon";

const TrendingButton = () => {
  return (
    <button className="flex items-center mobile-menu-element w-full px-3 py-1">
      <TrendingIcon />
      Trending
    </button>
  );
};

export default TrendingButton;
