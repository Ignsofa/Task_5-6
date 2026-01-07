import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validatorCreateCase = (req: Request, res: Response, next: NextFunction) => {
  const { userId, requestText, startDate, endDate } = req.body;
  const errors: string[] = [];

  if (!userId) {
    errors.push('Field "userId" is required');
  }

  if (!requestText || validator.isEmpty(requestText)) {
    errors.push('Field "requestText" is required');
  }

  if (startDate && !validator.isDate(startDate)) {
    errors.push('Field "startDate" must be a valid date (YYYY-MM-DD)');
  }

  if (endDate && !validator.isDate(endDate)) {
    errors.push('Field "endDate" must be a valid date (YYYY-MM-DD)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  return next(); // <--- ДОДАЛИ RETURN ТУТ
};
