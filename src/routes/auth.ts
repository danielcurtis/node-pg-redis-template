import { Router, Request, Response } from 'express';
import passport from 'passport';
import { isAuth, isGuest } from '../middleware/auth';

const router = Router();

/**
 * @desc   Login with Google authenticate
 * @route  GET /api/v1/auth/google
 */
router.get(
  '/google',
  isGuest,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @desc   Redirect callback after authenticate or not authenticate
 * @route  GET /api/v1/auth/google/callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000');
  }
);

/**
 * @desc   Logout user
 * @route  GET /api/v1/auth/logout
 */
router.get('/logout', isAuth, (req: Request, res: Response) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

/**
 * @desc   Return express user object
 * @route  GET /api/v1/auth/profile
 */
router.get('/profile', isAuth, (req: Request, res: Response) => {
  const user = JSON.parse(JSON.parse(JSON.stringify(req.user)));
  res.status(200).json({ success: true, user: user });
});

/**
 * @desc   Return is authenticated boolean
 * @route  GET /api/v1/auth
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, isAuth: req.isAuthenticated() });
});

export default router;
