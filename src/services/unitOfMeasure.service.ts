import type { UnitOfMeasure } from '../models/unitOfMeasure.interface';
import { MOCK_UNITS_OF_MEASURE } from '../mocks/unitOfMeasure.mock';

class UnitOfMeasureService {
  private units: UnitOfMeasure[] = [...MOCK_UNITS_OF_MEASURE];

  async getUnits(): Promise<UnitOfMeasure[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.units), 300);
    });
  }

  async getUnitById(id: string): Promise<UnitOfMeasure | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unit = this.units.find(u => u.id === id);
        resolve(unit);
      }, 300);
    });
  }
}

export const unitOfMeasureService = new UnitOfMeasureService();
