import router from "../router";

import { getHashtags } from "../controllers/content/hashtags";

router.get("/get-hashtags", getHashtags);

export default router;