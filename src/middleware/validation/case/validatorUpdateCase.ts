import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export const validatorUpdateCase = (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate, status } = req.body;
  const errors: string[] = [];

  if (!startDate && !endDate && status === undefined) {
    errors.push('At least one field must be provided for update (startDate, endDate, or status)');
  }

  if (startDate !== undefined) {
    if (!validator.isDate(startDate)) {
      errors.push('Field "startDate" must be a valid date (YYYY-MM-DD)');
    }

    if (validator.isEmpty(startDate)) {
      errors.push('Field "startDate" cannot be empty');
    }
  }

  if (endDate !== undefined) {
    if (!validator.isDate(endDate)) {
      errors.push('Field "endDate" must be a valid date (YYYY-MM-DD)');
    }

    if (validator.isEmpty(endDate)) {
      errors.push('Field "endDate" cannot be empty');
    }
  }

  if (status !== undefined) {
    if (typeof status !== 'boolean') {
      errors.push('Field "status" must be a boolean (true or false)');
    }
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      errors.push('Field "endDate" cannot be earlier than "startDate"');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  return next();
};
