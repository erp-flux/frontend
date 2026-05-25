import type { Indicator } from '../models/indicator.interface';
import { MOCK_INDICATORS } from '../mocks/indicator.mock';

class IndicatorService {
  private indicators: Indicator[] = [...MOCK_INDICATORS];

  async getIndicators(): Promise<Indicator[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.indicators), 300);
    });
  }

  async getIndicatorById(id: string): Promise<Indicator | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indicator = this.indicators.find(i => i.id === id);
        resolve(indicator);
      }, 300);
    });
  }
}

export const indicatorService = new IndicatorService();
