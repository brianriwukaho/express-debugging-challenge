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
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof SyntaxError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid JSON';
  }

  // Log the error
  console.error(`Error: ${err.message}`, err.stack);

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message: message,
  });
}
