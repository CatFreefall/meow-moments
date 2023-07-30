const postContent =
  "INSERT INTO posts (post_id, user_id, post_type, post_folder_path, description) VALUES ($1, $2, $3, $4, $5)";

const addTag = "INSERT INTO tags (tag_id, tag_name) VALUES ($1, $2)";
const addPostHashtags = "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)";
const getTag = "SELECT * FROM tags WHERE tag_name = $1";

export { postContent, addTag, addPostHashtags, getTag };