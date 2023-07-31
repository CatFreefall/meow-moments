type FileInputProps = {
  fileInput: React.RefObject<HTMLInputElement>;
};

const FileInput = ({ fileInput }: FileInputProps) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*, video/*"
        className="hidden"
        id="input-box"
        ref={fileInput}
        multiple
        onChange={() =>
          console.log(
            fileInput.current?.files?.[0].name +
              " change this later to display all files currently chosen on the page"
          )
        }
      />
      <div>{}</div>
      <label htmlFor="input-box" className="button">
        Choose File
      </label>
    </div>
  );
};

export default FileInput;
