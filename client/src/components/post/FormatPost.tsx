import { Key } from "react";
import { postProps } from "../../util/mediaArrayType";

// post areas are initially rendered with an image located in the public
// folder and replaced with the post image once loaded for lazy loading
// and a better user experience.
const FormatPost = ({ post }: postProps) => {
  const datePosted = new Date(post.date_posted).toUTCString();

  return (
    <section>
      <div>{post.username}</div>
      <div>{datePosted}</div>
      <div>
        {post.mediaFileURLs.map((url: string, index: Key) => {
          return (
            <div key={index}>
              <img
                src={url}
                alt="illustration"
                loading="lazy"
                className="w-screen"
              />
            </div>
          );
        })}
      </div>
      <div>{post.description}</div>
    </section>
  );
};

export default FormatPost;
