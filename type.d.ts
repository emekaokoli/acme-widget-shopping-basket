import { Request } from 'express';
import 'express-session';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}
