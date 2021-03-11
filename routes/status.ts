import { Router } from 'express';
import StatusController from '../controllers/status';

const router = Router();
const status = new StatusController();

/**
 * @desc   All systems status
 * @route  GET /api/v1/status
 */
router.route('/').get(status.getStatus);

/**
 * @desc   Server status
 * @route  GET /api/v1/status/server
 */
router.route('/server').get(status.getServerStatus);

/**
 * @desc   Postgres status
 * @route  GET /api/v1/status/postgres
 */
router.route('/postgres').get(status.getPostgresStatus);

/**
 * @desc   Redis status
 * @route  GET /api/v1/status/redis
 */
router.route('/postgres').get(status.getRedisStatus);

export default router;
