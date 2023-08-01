import { useState, useEffect } from "react";

import { postProps } from "../../util/mediaArrayType";

const LikePost = ({ post }: postProps) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLiked = () => {
    const postId = post.post_id;
    fetch(`/toggle-liked-post/${postId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setLiked(!liked));
  };

  useEffect(() => {
    fetch(`/get-liked-state/${post.post_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLiked(data));
  }, [post.post_id]);

  return (
    <button
      className={`button ${liked ? "bg-green" : null}`}
      onClick={toggleLiked}
    >
      {liked ? "Post Liked" : "Like Post"}
    </button>
  );
};

export default LikePost;
