import type { Country } from '../models/country.interface';
import { MOCK_COUNTRIES } from '../mocks/country.mock';

class CountryService {
  private countries: Country[] = [...MOCK_COUNTRIES];

  async getCountries(): Promise<Country[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.countries), 300);
    });
  }

  async getCountryById(id: string): Promise<Country | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const country = this.countries.find(c => c.id === id);
        resolve(country);
      }, 300);
    });
  }
}

export const countryService = new CountryService();
