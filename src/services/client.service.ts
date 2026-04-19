import { MOCK_CLIENTS } from '../mocks/client.mock';
import type { Client } from '../models/client.interface';

export const clientService = {
  /**
   * Récupère la liste des clients
   */
  async getClients(): Promise<Client[]> {
    // Simulation d'un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...MOCK_CLIENTS];
  },

  /**
   * Ajoute un nouveau client
   */
  async addClient(client: Omit<Client, 'id'>): Promise<Client> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newClient: Client = {
      ...client,
      id: Math.random().toString(36).substring(7),
    };
    MOCK_CLIENTS.push(newClient);
    return newClient;
  },

  /**
   * Met à jour un client existant
   */
  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = MOCK_CLIENTS.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Client introuvable');
    
    MOCK_CLIENTS[index] = { ...MOCK_CLIENTS[index], ...updates };
    return MOCK_CLIENTS[index];
  },

  /**
   * Supprime un client
   */
  async deleteClient(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = MOCK_CLIENTS.findIndex(c => c.id === id);
    if (index === -1) return false;
    MOCK_CLIENTS.splice(index, 1);
    return true;
  }
};
