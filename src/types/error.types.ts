/**
 * Custom application error with HTTP status code
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error response format
 */
export interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  stack?: string;
}
