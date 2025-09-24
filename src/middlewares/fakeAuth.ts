import { Request, Response, NextFunction } from 'express';

export const fakeAuth = (req: any, _res: Response, next: NextFunction) => {
  // Set user ID on request object
  req.userId = 'demo-user-123';

  // Also in session store
  if (req.session) {
    req.session.userId = 'demo-user-123';
  }

  console.log('Fake authentication applied for user:', req.userId);
  next();
};
