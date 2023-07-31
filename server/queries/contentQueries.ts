const postContent =
  "INSERT INTO posts (post_id, user_id, post_type, post_folder_path, description) VALUES ($1, $2, $3, $4, $5)";

const addTag = "INSERT INTO tags (tag_id, tag_name) VALUES ($1, $2)";
const getTag = "SELECT * FROM tags WHERE tag_name = $1";
const addPostHashtags = "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)";

const getPostsByRecent = "SELECT * FROM posts WHERE post_type = $1 ORDER BY date_posted DESC";

const getPostLikes = "SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2";
const deletePostLike = "DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2";
const addPostLike = "INSERT INTO post_likes (like_id, post_id, user_id) VALUES ($1, $2, $3)"

export { postContent, addTag, addPostHashtags, getTag, getPostsByRecent, getPostLikes, deletePostLike, addPostLike };