import type { EngagementMethod } from '../models/engagementMethod.interface';
import { MOCK_ENGAGEMENT_METHODS } from '../mocks/engagementMethod.mock';

class EngagementMethodService {
  private items: EngagementMethod[] = [...MOCK_ENGAGEMENT_METHODS];

  async getEngagementMethods(): Promise<EngagementMethod[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.items), 200));
  }
}

export const engagementMethodService = new EngagementMethodService();
