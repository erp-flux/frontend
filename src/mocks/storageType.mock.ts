import type { StorageType } from '../models/storageType.interface';

export const MOCK_STORAGE_TYPES: StorageType[] = [
  { id: 'S', label: 'Stocked (en stock)' },
  { id: 'N', label: 'Non-stocked' },
  { id: 'C', label: 'Charge directe' },
  { id: 'B', label: 'Bulk vrac' }
];
