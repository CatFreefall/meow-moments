const post =
  "INSERT INTO posts (post_id, user_id, post_type, post_folder_path, description) VALUES ($1, $2, $3, $4, $5)";
const removePost = "DELETE FROM posts WHERE post_id = $1";
const getPost = "SELECT * FROM posts WHERE post_id = $1";

const getPostsByRecent =
  "SELECT * FROM posts WHERE post_type = $1 ORDER BY date_posted DESC";
const getPostsByUserID =
  "SELECT * FROM posts WHERE user_id = $1 ORDER BY date_posted DESC";

const removePostLike =
  "DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2";
const addPostLike =
  "INSERT INTO post_likes (like_id, post_id, user_id) VALUES ($1, $2, $3)";
const getPostLikes = "SELECT * FROM post_likes WHERE post_id = $1";
const postLikedByUser =
  "SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2";

const updateLastPosted = "UPDATE users SET last_posted = $1 WHERE id = $2";

export {
  post,
  getPostsByRecent,
  getPostsByUserID,
  postLikedByUser,
  removePostLike,
  addPostLike,
  getPostLikes,
  updateLastPosted,
  getPost,
  removePost,
};
