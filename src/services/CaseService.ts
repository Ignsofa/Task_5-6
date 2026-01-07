import { getRepository } from 'typeorm';

import { Apply } from '../orm/entities/Apply';
import { Case } from '../orm/entities/Case';
import { User } from '../orm/entities/users/User';

export class CaseService {
  public async create(data: {
    userId: number;
    requestText: string;
    startDate: string;
    endDate: string;
  }): Promise<Case> {
    const { userId, requestText, startDate, endDate } = data;

    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const newApply = Apply.create({
      date: new Date().toISOString().split('T')[0],
      request: requestText,
    });
    await newApply.save();

    const newCase = Case.create({
      startDate: startDate,
      endDate: endDate,
      status: false,
      user: user,
      apply: newApply,
    });
    await newCase.save();

    return newCase;
  }

  public async getAll(): Promise<Case[]> {
    return await Case.find({
      relations: ['user', 'apply'],
    });
  }

  public async delete(id: number): Promise<void> {
    const caseToDelete = await Case.findOne({ where: { id } });

    if (!caseToDelete) {
      throw new Error(`Case with id ${id} not found`);
    }

    await caseToDelete.remove();
  }
}
