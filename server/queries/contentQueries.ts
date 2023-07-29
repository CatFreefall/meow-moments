const postContent =
  "INSERT INTO posts (post_id, user_id, post_type, post_folder_path, description) VALUES ($1, $2, $3, $4, $5)";

export { postContent };