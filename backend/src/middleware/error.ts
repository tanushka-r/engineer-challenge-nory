import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const { message } = error;

  if (res.headersSent) {
    console.error(error);
    next(error);
  }

  if (error instanceof ZodError) {
    res.status(500).json({ message: 'Zod validation error', issues: error.issues }).end();
  }

  res.status(500).json({ message }).end();
};

export default errorHandler;
