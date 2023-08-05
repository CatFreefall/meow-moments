import { postProps } from "../../../util/mediaArrayType";

const DeletePost = ({ post }: postProps) => {
  const deletePost = () => {
    const postId = post.post_id;
    fetch(`/delete-post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => window.location.reload());
  };

  return (
    <button className="button w-fit" onClick={deletePost}>
      Delete Post
    </button>
  );
};

export default DeletePost;
