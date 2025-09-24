import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// Custom error interface to include statusCode
interface AppError extends Error {
    statusCode?: number;
  }
  // 
// Error handling middleware
export const errorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;
    
    res.status(statusCode).json({
      status: 'error',
      message: message
    });
  };