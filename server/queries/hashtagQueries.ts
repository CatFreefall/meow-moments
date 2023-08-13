const addPostHashtags =
  "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)";
const getPostHashtags = "SELECT * FROM post_tags WHERE post_id = $1";
const getPostsByID = "SELECT * FROM post_tags WHERE tag_id = $1";

const addTag = "INSERT INTO tags (tag_id, tag_name) VALUES ($1, $2)";
const getTagByName = "SELECT * FROM tags WHERE tag_name = $1";
const getTagByID = "SELECT * FROM tags WHERE tag_id = $1";
const getAllTags = "SELECT * FROM tags";

export {
  addPostHashtags,
  getPostHashtags,
  getPostsByID,
  addTag,
  getTagByName,
  getTagByID,
  getAllTags,
};
