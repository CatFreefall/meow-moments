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
      <label htmlFor="input-box" className="button w-fit">
        Choose File (Max: 10)
      </label>
    </section>
  );
};

export default FileInput;
