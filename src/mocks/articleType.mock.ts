import type { ArticleType } from '../models/articleType.interface';

export const MOCK_ARTICLE_TYPES: ArticleType[] = [
  { id: 'B', label: 'Bulk (vrac)' },
  { id: 'P', label: 'Packed (conditionné)' },
  { id: 'S', label: 'Service' },
  { id: 'N', label: 'Non-stock' }
];
