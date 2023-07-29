import { useRef } from "react";

import FileInput from "./components/FileInput";

const Post = () => {
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
    <div className="h-screen">
      <div className="mx-5 flex flex-col h-full items-center justify-evenly">
        <FileInput fileInput={fileInput} />
        <select className="text-black" ref={postType}>
          <option value="illustration">Illustration</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
        <button className="button w-fit" onClick={submitFile}>
          Post Illustration
        </button>
      </div>
    </div>
  );
};

export default Post;
