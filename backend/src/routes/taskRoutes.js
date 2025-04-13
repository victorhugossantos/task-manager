import { createTask, getTasks } from "../controllers/taskController.js";
import authenticate from "../middleware/auth.js";
import { Router } from 'express'

const router = Router();

router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);

export default router;