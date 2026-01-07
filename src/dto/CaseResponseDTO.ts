import { Case } from '../orm/entities/Case';

export class CaseResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  request: string;
  clientName: string;

  constructor(caseEntity: Case) {
    this.id = caseEntity.id;
    this.startDate = caseEntity.startDate;
    this.endDate = caseEntity.endDate;

    this.status = caseEntity.status ? 'Closed' : 'Active';

    this.request = caseEntity.apply ? caseEntity.apply.request : 'N/A';

    this.clientName = caseEntity.user ? caseEntity.user.username || 'Unknown' : 'Unknown';
  }
}
