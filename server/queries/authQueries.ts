const registerUser =
  "INSERT INTO users (username, password_hash, account_creation_date, last_posted, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const usernameExists = "SELECT * FROM users WHERE username = $1";
const emailExists = "SELECT * FROM users WHERE email = $1";


export { registerUser, usernameExists, emailExists };
