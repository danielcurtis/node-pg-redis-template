import { Request, Response, NextFunction } from 'express';

function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('http://localhost:3000');
  }
}

function isGuest(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:3000');
  } else {
    return next();
  }
}

export { isAuth, isGuest };
