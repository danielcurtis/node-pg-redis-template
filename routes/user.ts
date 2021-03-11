import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();
const user = new UserController();

/**
 * @desc   Create user
 * @route  POST /api/v1/user
 */
router.route('/').post(user.create);

/**
 * @desc   Get, update, or delete user by ID
 * @route  GET|PUT|DELETE /api/v1/user/:id
 */
router.route('/:id').get(user.read).put(user.update).delete(user.delete);

export default router;
