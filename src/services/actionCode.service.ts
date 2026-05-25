import type { ActionCode } from '../models/actionCode.interface';
import { MOCK_ACTION_CODES } from '../mocks/actionCode.mock';

class ActionCodeService {
  private actionCodes: ActionCode[] = [...MOCK_ACTION_CODES];

  async getActionCodes(): Promise<ActionCode[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.actionCodes), 300);
    });
  }

  async getActionCodeById(id: string): Promise<ActionCode | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const action = this.actionCodes.find(a => a.id === id);
        resolve(action);
      }, 300);
    });
  }
}

export const actionCodeService = new ActionCodeService();
