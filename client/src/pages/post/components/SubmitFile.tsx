import { useRef } from "react";

import validateFileType from "../../../util/validateFileType";
import FileInput from "./FileInput";

//TODO: only allow submission of image/video file extensions
const SubmitFile = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const postType = useRef<HTMLSelectElement>(null);

  const submitFile = () => {
    const files = fileInput.current?.files;

    // indexing through the files given by the user and appending them to
    // formData to be sent to the server
    const fileArray = Array.from(files as FileList);
    const formData = new FormData();
    fileArray.map((file) => formData.append("files", file));

    try {
      fetch(`/post/${postType?.current?.value}s`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col mt-16 items-center justify-items-center">
      <FileInput fileInput={fileInput} />
      <select className="text-black" ref={postType}>
        <option value="illustration">Illustration</option>
        <option value="photo">Photo</option>
        <option value="video">Video</option>
      </select>
      <button className="button w-fit" onClick={submitFile}>
        Post Illustration
      </button>
    </section>
  );
};

export default SubmitFile;
