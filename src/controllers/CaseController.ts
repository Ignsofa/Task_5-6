import { NextFunction, Request, Response } from 'express';

import { CaseResponseDTO } from '../dto/CaseResponseDTO';
import { CaseService } from '../services/CaseService';

export const createCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const caseService = new CaseService();
    const newCase = await caseService.create(req.body);
    const responseDTO = new CaseResponseDTO(newCase);

    return res.status(201).json(responseDTO);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message || 'Error creating case' });
  }
};

export const getCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const caseService = new CaseService();
    const cases = await caseService.getAll();
    const responseDTOs = cases.map((c) => new CaseResponseDTO(c));

    return res.json(responseDTOs);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching cases' });
  }
};

export const getCaseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({ message: 'Invalid case ID' });
    }

    const caseService = new CaseService();
    const caseEntity = await caseService.findOne(numericId);

    const responseDTO = new CaseResponseDTO(caseEntity!);

    return res.status(200).json(responseDTO);
  } catch (error: any) {
    console.error('Error fetching case by ID:', error);

    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Error fetching case' });
  }
};

export const updateCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({ message: 'Invalid case ID' });
    }

    const caseService = new CaseService();
    const updatedCase = await caseService.update(numericId, req.body);
    const responseDTO = new CaseResponseDTO(updatedCase);

    return res.status(200).json(responseDTO);
  } catch (error: any) {
    console.error('Error updating case:', error);

    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message || 'Error updating case' });
  }
};

export const deleteCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({ message: 'Invalid case ID' });
    }

    const caseService = new CaseService();
    await caseService.delete(numericId);

    return res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting case:', error);

    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || 'Error deleting case' });
  }
};
