import { createTask } from "../controllers/taskController";
import { authenticate } from "../middleware/auth";

router.post('/', authenticate, createTask)