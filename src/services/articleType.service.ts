import type { ArticleType } from '../models/articleType.interface';
import { MOCK_ARTICLE_TYPES } from '../mocks/articleType.mock';

class ArticleTypeService {
  private articleTypes: ArticleType[] = [...MOCK_ARTICLE_TYPES];

  async getArticleTypes(): Promise<ArticleType[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.articleTypes), 300);
    });
  }

  async getArticleTypeById(id: string): Promise<ArticleType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const type = this.articleTypes.find(t => t.id === id);
        resolve(type);
      }, 300);
    });
  }
}

export const articleTypeService = new ArticleTypeService();
