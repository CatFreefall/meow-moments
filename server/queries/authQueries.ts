const registerUser =
  "INSERT INTO users (username, password_hash, password_salt, email, account_creation_date) VALUES ($1, $2, $3, $4, $5)";
const usernameExists = "SELECT * FROM users WHERE username = $1";
const emailExists = "SELECT * FROM users WHERE email = $1";


export { registerUser, usernameExists, emailExists };
