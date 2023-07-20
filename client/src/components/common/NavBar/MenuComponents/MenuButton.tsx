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
    <img
      src="../../../assets/icons/menu-icon.webp"
      alt=""
      className="w-12 ml-4"
    />
  </button>
);

export default MenuButton;
