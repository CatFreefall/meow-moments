type FileInputProps = {
  fileInput: React.RefObject<HTMLInputElement>;
};

const FileInput = ({ fileInput }: FileInputProps) => {
  return (
    <section>
      <input
        type="file"
        accept="image/*, video/*"
        className="hidden"
        id="file-input-button"
        ref={fileInput}
        multiple
        onChange={() =>
          console.log(
            fileInput.current?.files?.[0].name +
              " change this later to display all files currently chosen on the page"
          )
        }
      />
      <label htmlFor="file-input-button" className="button w-fit hover:cursor-pointer">
        Choose File (Max: 10)
      </label>
    </section>
  );
};

export default FileInput;
