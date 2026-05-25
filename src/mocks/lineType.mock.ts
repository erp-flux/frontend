import type { LineType } from '../models/lineType.interface';

export const MOCK_LINE_TYPES: LineType[] = [
  { id: 'S', label: 'Stock' },
  { id: 'N', label: 'Non-stock' },
  { id: 'J', label: 'Non-stock sans compte GL' },
  { id: 'B', label: 'Bulk vrac' },
  { id: 'F', label: 'Fret' },
  { id: 'W', label: 'Travail/Main-oeuvre' }
];
