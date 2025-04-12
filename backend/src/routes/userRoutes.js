import { getProfile } from "../controllers/userController";
import { authenticate } from "../middleware/auth";

router.get('/profile', authenticate, getProfile);
