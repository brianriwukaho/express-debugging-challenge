import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../types/error.types';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Default status code
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  // Check if it's our own app error
  if (err instanceof AppError) {
    statusCode = err.statusCode;
  }

  // Log the error
  console.error(`Error: ${err.message}`, err.stack);

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
