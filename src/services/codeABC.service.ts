import type { CodeABC } from '../models/codeABC.interface';
import { MOCK_CODE_ABCS } from '../mocks/codeABC.mock';

class CodeABCService {
  private items: CodeABC[] = [...MOCK_CODE_ABCS];

  async getCodeABCs(): Promise<CodeABC[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.items), 200));
  }
}

export const codeABCService = new CodeABCService();
