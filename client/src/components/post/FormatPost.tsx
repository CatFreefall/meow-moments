import { Key } from "react";
import { postProps } from "../../util/mediaArrayType";
import { useNavigate } from "react-router-dom";

import MediaCarousel from "./MediaCarousel";

// post areas are initially rendered with an image located in the public
// folder and replaced with the post image once loaded for lazy loading
// and a better user experience.
const FormatPost = ({ post }: postProps) => {
  const nav = useNavigate();

  const datePosted = new Date(post.date_posted).toUTCString();

  return (
    <section>
      <button onClick={() => nav(`/profile/${post.username}`)}>
        {post.username}
      </button>
      <div>{datePosted}</div>
      <MediaCarousel srcURLs={post.mediaFileURLs} />
      <div>{post.description}</div>
    </section>
  );
};

export default FormatPost;
