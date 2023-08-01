import { Key, useState } from "react";
import { postProps } from "../../util/mediaArrayType";

const FormatPost = ({ post }: postProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const datePosted = new Date(post.date_posted).toUTCString();

  return (
    <div>
      <div>{post.username}</div>
      <div>{datePosted}</div>
      <div>
        {post.mediaFileURLs.map((url: string, index: Key) => {
          return (
            <img key={index} src={url} alt="illustration" loading="lazy" onLoad={() => setLoading(false)} />
          );
        })}
      </div>
      <div>{post.description}</div>
    </div>
  );
};

export default FormatPost;
