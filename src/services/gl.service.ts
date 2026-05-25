import type { GL } from '../models/gl.interface';
import { MOCK_GL_CODES } from '../mocks/gl.mock';

class GLService {
  private glCodes: GL[] = [...MOCK_GL_CODES];

  async getGLCodes(): Promise<GL[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.glCodes), 300);
    });
  }

  async getGLById(id: string): Promise<GL | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const gl = this.glCodes.find(g => g.id === id);
        resolve(gl);
      }, 300);
    });
  }
}

export const glService = new GLService();
