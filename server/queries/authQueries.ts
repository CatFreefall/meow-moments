const registerUser =
  "INSERT INTO users (username, password_hash, email, account_creation_date) VALUES ($1, $2, $3, $4)";

const changeVerificationStatus =
  "UPDATE users SET is_verified = true WHERE username = $1";

const changeDBPasswordHash =
  "UPDATE users SET password_hash = $1 WHERE username = $2";

export {
  registerUser,
  changeVerificationStatus,
  changeDBPasswordHash,
};
