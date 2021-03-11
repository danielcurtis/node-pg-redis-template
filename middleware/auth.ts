import { Request, Response, NextFunction } from 'express';

function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

function isGuest(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    res.redirect('/some-authenticated-page');
  } else {
    return next();
  }
}

export { isAuth, isGuest };
