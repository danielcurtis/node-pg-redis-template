import { Router, Request, Response } from 'express';
import passport from 'passport';
import { isAuth, isGuest } from '../middleware/auth';

const router = Router();

/**
 * @desc   Google authenticate
 * @route  GET /api/v1/auth/google
 */
router.get(
  '/google',
  isGuest,
  passport.authenticate('google', { scope: ['profile'] })
);

/**
 * @desc   Google auth callback
 * @route  GET /api/v1/auth/google/callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req: Request, res: Response) => {
    res.redirect('/some-authenticated-page?');
  }
);

/**
 * @desc   Logout user
 * @route  GET /api/v1/auth/logout
 */
router.get('/logout', isAuth, (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

export default router;
