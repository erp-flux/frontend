import { MOCK_USER } from '../mocks/auth.mock';

const TOKEN_KEY = 'fluxaa_auth_token';
const USER_KEY = 'fluxaa_user';

export const authService = {
  /**
   * Simule une connexion API
   */
  async login(email: string, password: string) {
    // Simulation d'un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const token = 'fake-jwt-token-' + Math.random().toString(36).substring(7);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
      return { success: true, user: MOCK_USER };
    }

    throw new Error('Email ou mot de passe incorrect');
  },

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Récupère l'utilisateur connecté
   */
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
};
