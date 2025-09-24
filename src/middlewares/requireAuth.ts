import { NextFunction, Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
};
