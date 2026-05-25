import type { Product } from '../models/product.interface';
import { MOCK_PRODUCTS } from '../mocks/product.mock';

class ProductService {
  private products: Product[] = [...MOCK_PRODUCTS];

  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.products), 300);
    });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.products.find(p => p.id === id)), 200);
    });
  }

  async addProduct(product: Product): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        product.id = 'PRD-' + Math.random().toString(36).substr(2, 9);
        this.products.push(product);
        resolve(product);
      }, 500);
    });
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.products.findIndex(p => p.id === id);
        if (index > -1) {
          this.products[index] = { ...this.products[index], ...data };
          resolve(this.products[index]);
        } else {
          resolve(undefined);
        }
      }, 500);
    });
  }

  async deleteProduct(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== id);
        resolve(this.products.length !== initialLength);
      }, 500);
    });
  }
}

export const productService = new ProductService();
