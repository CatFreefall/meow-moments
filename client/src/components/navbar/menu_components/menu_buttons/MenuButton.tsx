type MenuButtonProps = {
  menuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuButton = ({ menuActive }: MenuButtonProps) => (
  <button
    onClick={() => {
      menuActive(true);
      document.body.style.overflow = "hidden";
    }}
  >
    <div className="ml-1 text-2xl font-bold">☰</div>
  </button>
);

export default MenuButton;
