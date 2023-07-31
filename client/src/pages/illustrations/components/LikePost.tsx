import { useState } from "react";

const LikePost = ({ post }: any) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLiked = () => {
    fetch("/toggle-liked-post", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.post_id,
      }),
    }).then(() => setLiked(!liked));
  };

  const getLikedState = () => {
    
  }

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
