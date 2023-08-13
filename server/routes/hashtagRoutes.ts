import router from "../router";

import { getHashtags } from "../controllers/content/getHashtags";

router.get("/get-hashtags", getHashtags);

export default router;