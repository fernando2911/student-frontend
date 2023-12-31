import create from 'zustand';

import { AuthState, Credentials } from '../@types/auth';
import api from '../services/api';

const useAuthStore = create<AuthState>(set => ({
  responseWithErrors: false,
  login: async (credentials: Credentials) => {
    try {
      const response = await api.post('/login', credentials);

      const { user, token } = response.data;

      sessionStorage.setItem('token', token);

    } catch (error) {
      set({ responseWithErrors: true });
      console.error(error);
    }
  },
  logout: () => {
    sessionStorage.removeItem('token');
  }
}));

export default useAuthStore;
