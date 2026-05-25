import type { LotManagement } from '../models/lotManagement.interface';
import { MOCK_LOT_MANAGEMENTS } from '../mocks/lotManagement.mock';

class LotManagementService {
  private items: LotManagement[] = [...MOCK_LOT_MANAGEMENTS];

  async getLotManagements(): Promise<LotManagement[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.items), 200));
  }
}

export const lotManagementService = new LotManagementService();
