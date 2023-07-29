import React from "react";

type FileInputProps = {
  fileInput: React.RefObject<HTMLInputElement>;
};

const FileInput = ({ fileInput }: FileInputProps) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*, video/*"
        id="input-box"
        ref={fileInput}
        multiple
        className=""
      />
    </div>
  );
};

export default FileInput;
