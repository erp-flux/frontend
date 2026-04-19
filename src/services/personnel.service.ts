import type { PersonnelMember, HRRequest } from '../models/personnel.interface';
import { MOCK_PERSONNEL, MOCK_HR_REQUESTS } from '../mocks/personnel.mock';

class PersonnelService {
  private personnel: PersonnelMember[] = [...MOCK_PERSONNEL];
  private requests: HRRequest[] = [...MOCK_HR_REQUESTS];

  async getPersonnel(): Promise<PersonnelMember[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.personnel), 500);
    });
  }

  async getHRRequests(): Promise<HRRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.requests), 500);
    });
  }

  async savePersonnel(data: PersonnelMember): Promise<PersonnelMember> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.personnel.findIndex(p => p.id === data.id);
        if (index > -1) {
          this.personnel[index] = data;
        } else {
          this.personnel.push({ ...data, id: Math.random().toString(36).substr(2, 9) });
        }
        resolve(data);
      }, 1000);
    });
  }

  async saveHRRequest(data: HRRequest): Promise<HRRequest> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.requests.findIndex(r => r.id === data.id);
        if (index > -1) {
          this.requests[index] = data;
        } else {
          this.requests.push({ ...data, id: Math.random().toString(36).substr(2, 9) });
        }
        resolve(data);
      }, 1000);
    });
  }

  async deletePersonnel(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.personnel = this.personnel.filter(p => p.id !== id);
        resolve();
      }, 500);
    });
  }
}

export const personnelService = new PersonnelService();
