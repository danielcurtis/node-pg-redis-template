import { Router } from 'express';
import UserController from '../controllers/user';
import { isAuth } from '../middleware/auth';

const router = Router();
const user = new UserController();

/**
 * @desc   Create, read, update, or delete a user by their session
 * @route  POST|GET|PUT|DELETE /api/v1/user
 */
router
  .route('/')
  .post(isAuth, user.create)
  .get(isAuth, user.read)
  .put(isAuth, user.update)
  .delete(isAuth, user.delete);

export default router;
