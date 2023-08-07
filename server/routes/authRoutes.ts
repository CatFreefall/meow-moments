import router from "../router";

import {
  addUser,
  verifyUser,
  sendVerificationEmail,
} from "../controllers/auth/userRegistration";
import {
  emailExists,
  usernameExists,
} from "../controllers/auth/checkExistingCredentials";
import { loginUser, logoutUser } from "../controllers/auth/authentication";
import {
  resetPasswordReq,
  changePassword,
} from "../controllers/auth/passwordReset";
import { verifyCookies } from "../controllers/auth/authorization";

router.post("/register", addUser);
router.get("/validate-username/:username", usernameExists);
router.get("/validate-email/:email", emailExists);

router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/confirm/:username/:token", verifyUser);

router.post("/password-reset-req", resetPasswordReq);
router.put("/password-reset/:user/:token", changePassword);

router.get("/authorization-request", verifyCookies);
router.post("/send-confirmation-email/:username", sendVerificationEmail);

export default router;
