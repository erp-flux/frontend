import type { LineType } from '../models/lineType.interface';
import { MOCK_LINE_TYPES } from '../mocks/lineType.mock';

class LineTypeService {
  private lineTypes: LineType[] = [...MOCK_LINE_TYPES];

  async getLineTypes(): Promise<LineType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.lineTypes), 300);
    });
  }

  async getLineTypeById(id: string): Promise<LineType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lineType = this.lineTypes.find(l => l.id === id);
        resolve(lineType);
      }, 300);
    });
  }
}

export const lineTypeService = new LineTypeService();
