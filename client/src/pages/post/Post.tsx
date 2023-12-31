import { useRef } from "react";

import FileInput from "./components/FileInput";
import Footer from "../../components/common/Footer";

// TODO: do file format checking before sending to server
const Post = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const postType = useRef<HTMLSelectElement>(null);
  const postDescription = useRef<HTMLTextAreaElement>(null);
  const hashtags = useRef<HTMLInputElement>(null);

  const submitFile = () => {
    const files = fileInput.current?.files;

    // appending the necessary info needed to create a post to formData
    const fileArray = Array.from(files as FileList);
    const formData = new FormData();
    fileArray.map((file) => formData.append("files", file));
    formData.append("description", postDescription.current?.value as string);
    formData.append("hashtags", hashtags.current?.value as string);

    try {
      fetch(`/post/${postType?.current?.value}s`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="mx-5 mt-16 flex flex-col items-center">
        <FileInput fileInput={fileInput} />
        <select className="text-darkgrey" ref={postType}>
          <option value="illustration">Illustration</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
        <textarea
          className="w-full text-darkgrey px-2"
          placeholder="Post description (optional)"
          ref={postDescription}
        ></textarea>
        <input
          type="text"
          placeholder="Hashtags (Max - 3, optional)"
          ref={hashtags}
          className="w-full text-darkgrey px-2"
        />
        <button className="button w-fit" onClick={submitFile}>
          Post!
        </button>
      </main>
      <Footer />
    </section>
  );
};

export default Post;
