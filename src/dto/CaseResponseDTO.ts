import { Case } from '../orm/entities/Case';

export class CaseResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  status: string;

  user: {
    id: number;
    email: string;
    username: string | null;
    name: string | null;
    role: string;
  } | null;

  apply: {
    id: number;
    date: string;
    request: string;
  } | null;

  constructor(caseEntity: Case) {
    this.id = caseEntity.id;
    this.startDate = caseEntity.startDate;
    this.endDate = caseEntity.endDate;

    this.status = caseEntity.status ? 'Closed' : 'Active';

    if (caseEntity.user) {
      this.user = {
        id: caseEntity.user.id,
        email: caseEntity.user.email,
        username: caseEntity.user.username,
        name: caseEntity.user.name,
        role: caseEntity.user.role,
      };
    } else {
      this.user = null;
    }

    if (caseEntity.apply) {
      this.apply = {
        id: caseEntity.apply.id,
        date: caseEntity.apply.date,
        request: caseEntity.apply.request,
      };
    } else {
      this.apply = null;
    }
  }
}
