type MenuSectionDividerProps = {
  color: string;
}

const MenuSectionDivider = ({ color }: MenuSectionDividerProps) => {
  return <section className={`w-full rounded-sm h-0.5 ${color}`}></section>;
};

MenuSectionDivider.defaultProps = {
  color: "bg-darkishgrey",
}

export default MenuSectionDivider;
