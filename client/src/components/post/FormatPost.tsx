import { Key, useState } from "react";
import { postProps } from "../../util/mediaArrayType";

// post areas are initially rendered with an image located in the public
// folder and replaced with the post image once loaded for lazy loading
// and a better user experience.
const FormatPost = ({ post }: postProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setLoaded = () => {
    setIsLoading(false);
  };

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
                src={isLoading ? "assets/images/cat-tap.webp" : url}
                alt="illustration"
                loading="lazy"
                onLoad={() => setLoaded()}
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
