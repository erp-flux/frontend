import { MOCK_BACS } from '../mocks/bac.mock';
import type { Bac } from '../models/bac.interface';

export const bacService = {
  async getBacs(): Promise<Bac[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...MOCK_BACS];
  },

  async addBac(bac: Omit<Bac, 'id'>): Promise<Bac> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newBac: Bac = {
      ...bac,
      id: Math.random().toString(36).substring(7),
    };
    MOCK_BACS.push(newBac);
    return newBac;
  },

  async updateBac(id: string, updates: Partial<Bac>): Promise<Bac> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = MOCK_BACS.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Bac introuvable');
    
    MOCK_BACS[index] = { ...MOCK_BACS[index], ...updates };
    return MOCK_BACS[index];
  },

  async deleteBac(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = MOCK_BACS.findIndex(b => b.id === id);
    if (index === -1) return false;
    MOCK_BACS.splice(index, 1);
    return true;
  }
};
