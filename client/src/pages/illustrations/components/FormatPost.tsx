import { Key } from "react";

const FormatPost = ({ post }: any) => {
  return (
    <div>
      <div>{post.username}</div>
      <div>{post.date_posted}</div>
      <div>
        {post.mediaFileURLs.map((url: string, index: Key) => {
          return (
            <img key={index} src={url} alt="illustration" loading="lazy" />
          );
        })}
      </div>
      <div>{post.description}</div>
    </div>
  );
};

export default FormatPost;
