import LoginButton from "../../../LoginButton";
import IllustrationsButton from "./IllustrationsButton";

const MenuContents = () => {
  return (
    <div className="flex justify-center text-4xl font-body">
      <div className="hover:bg-lightgrey transition duration-200 ease-out w-4/5 mt-16">
        <IllustrationsButton />
      </div>
    </div>
  );
};

export default MenuContents;
