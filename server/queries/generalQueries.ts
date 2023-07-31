const getEntryByUsername = "SELECT * FROM users WHERE username = $1";
const getEntryByEmail = "SELECT * FROM users WHERE email = $1";
const getEntryByID = "SELECT * FROM users WHERE id = $1"

export { getEntryByUsername, getEntryByEmail, getEntryByID };