type DropdownLabelProps = {
  dropdownActive: boolean;
  contentType: string;
};

const PhotosDropdown = ({
  dropdownActive,
  contentType,
}: DropdownLabelProps) => {
  return (
    <label htmlFor="photos-dropdown">
      <div
        className={`hover: cursor-pointer flex py-3 items-center ${
          dropdownActive ? "bg-lightgrey" : "bg-darkgrey"
        }`}
      >
        <img
          src="/assets/icons/photo-icon.webp"
          alt=""
          className="w-5 h-5 mx-3"
        ></img>
        {contentType}
        <img
          src={`${
            dropdownActive
              ? "/assets/icons/arrow-up-icon.webp"
              : "/assets/icons/arrow-down-icon.webp"
          }`}
          alt=""
          className={`w-5 ml-auto mr-4
            }}`}
        ></img>
      </div>
    </label>
  );
};

export default PhotosDropdown;
