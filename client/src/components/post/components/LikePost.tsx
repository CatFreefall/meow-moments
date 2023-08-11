import { useState, useEffect } from "react";

type likePostProps = {
  postId: string;
  totalPostLikesRef: React.MutableRefObject<number>;
};

const LikePost = ({ postId, totalPostLikesRef }: likePostProps) => {
  const [liked, setLiked] = useState<boolean>(false);

  // temporarily updating the total likes when the user likes/unlikes the
  // post. this makes it so that on every like/unlike for the current user,
  // I don't have to fetch the total number of likes from the database for
  // the current post.
  const likePost = () => {
    totalPostLikesRef.current += 1;
  };

  const unlikePost = () => {
    totalPostLikesRef.current -= 1;
  };

  const toggleLiked = () => {
    fetch(`/toggle-liked-post/${postId}`, {
      method: "PUT",
      credentials: "include",
    })
      .then(() => setLiked(!liked))
      .then(() => {
        liked ? unlikePost() : likePost();
      });
  };

  // checking if the post was liked by the user on page load
  useEffect(() => {
    fetch(`/get-liked-state/${postId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLiked(data));
  }, [postId]);

  return (
    <section className="flex items-center">
      {totalPostLikesRef.current}
      <img
        alt=""
        src={`${
          liked
            ? "/assets/icons/heart-active-icon.webp"
            : "/assets/icons/heart-inactive-icon.webp"
        }`}
        className="w-5 h-5 hover:cursor-pointer"
        onClick={toggleLiked}
      ></img>
    </section>
  );
};

export default LikePost;
