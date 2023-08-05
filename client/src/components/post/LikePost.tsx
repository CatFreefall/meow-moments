import { useState, useEffect } from "react";

import { postProps } from "../../util/mediaArrayType";

const LikePost = ({ post }: postProps) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  const toggleLiked = () => {
    const postId = post.post_id;
    fetch(`/toggle-liked-post/${postId}`, {
      method: "PUT",
      credentials: "include",
    }).then(() => setLiked(!liked));
  };

  // checking if the post was liked by the user on page load
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

  // fetching the total number of likes for the post. includes the user's like (if
  // they have liked the post)
  useEffect(() => {
    fetch(`/get-total-likes/${post.post_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTotalLikes(data));
  }, [liked, post.post_id]);

  return (
    <section>
      <button
        className={`button ${liked ? "bg-green" : null}`}
        onClick={toggleLiked}
      >
        {liked ? "Post Liked" : "Like Post"}
      </button>
      <div>Total Likes: {totalLikes}</div>
    </section>
  );
};

export default LikePost;
