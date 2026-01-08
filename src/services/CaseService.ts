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

    return (await Case.findOne({
      where: { id: newCase.id },
      relations: ['user', 'apply'],
    })) as Case;
  }

  public async getAll(): Promise<Case[]> {
    return await Case.find({
      relations: ['user', 'apply'],
    });
  }

  public async findOne(id: number): Promise<Case | null> {
    const caseEntity = await Case.findOne({
      where: { id },
      relations: ['user', 'apply'],
    });

    if (!caseEntity) {
      throw new Error(`Case with id ${id} not found`);
    }

    return caseEntity;
  }

  public async update(
    id: number,
    data: {
      startDate?: string;
      endDate?: string;
      status?: boolean;
    },
  ): Promise<Case> {
    const caseToUpdate = await Case.findOne({ where: { id } });

    if (!caseToUpdate) {
      throw new Error(`Case with id ${id} not found`);
    }

    if (data.startDate !== undefined) {
      caseToUpdate.startDate = data.startDate;
    }
    if (data.endDate !== undefined) {
      caseToUpdate.endDate = data.endDate;
    }
    if (data.status !== undefined) {
      caseToUpdate.status = data.status;
    }

    await caseToUpdate.save();

    return (await Case.findOne({
      where: { id },
      relations: ['user', 'apply'],
    })) as Case;
  }

  public async delete(id: number): Promise<void> {
    const caseToDelete = await Case.findOne({
      where: { id },
      relations: ['apply'],
    });

    if (!caseToDelete) {
      throw new Error(`Case with id ${id} not found`);
    }

    const applyId = caseToDelete.apply?.id;

    await caseToDelete.remove();

    if (applyId) {
      const applyToDelete = await Apply.findOne({ where: { id: applyId } });
      if (applyToDelete) {
        await applyToDelete.remove();
      }
    }
  }
}
