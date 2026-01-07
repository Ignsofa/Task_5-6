import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../orm/entities/users/User';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepo = getRepository(User);
    const users = await userRepo.find({
      select: ['id', 'email', 'username', 'created_at'],
    });
    return res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};
