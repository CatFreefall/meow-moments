const registerUser =
  "INSERT INTO users (username, password_hash, email, account_creation_date) VALUES ($1, $2, $3, $4)";

const getEntryByUsername = "SELECT * FROM users WHERE username = $1";
const getEntryByEmail = "SELECT * FROM users WHERE email = $1";

const changeVerifyStatus =
  "UPDATE users SET is_verified = true WHERE username = $1";

const changeDBPassword =
  "UPDATE users SET password_hash = $1 WHERE username = $2";

export {
  registerUser,
  getEntryByUsername,
  getEntryByEmail,
  changeVerifyStatus,
  changeDBPassword,
};
