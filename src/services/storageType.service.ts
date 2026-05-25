import type { StorageType } from '../models/storageType.interface';
import { MOCK_STORAGE_TYPES } from '../mocks/storageType.mock';

class StorageTypeService {
  private storageTypes: StorageType[] = [...MOCK_STORAGE_TYPES];

  async getStorageTypes(): Promise<StorageType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.storageTypes), 300);
    });
  }

  async getStorageTypeById(id: string): Promise<StorageType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storageType = this.storageTypes.find(s => s.id === id);
        resolve(storageType);
      }, 300);
    });
  }
}

export const storageTypeService = new StorageTypeService();
