import { apiClient } from './client';
import type { 
  LoginRequest, 
  SignupRequest, 
  AuthResponse, 
  RefreshTokenRequest, 
  RefreshTokenResponse 
} from '@/types';

export const authAPI = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', data);
    return response.data;
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/signup', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/api/v1/auth/logout');
  },

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/api/v1/auth/refresh', data);
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/api/v1/auth/profile');
    return response.data;
  },
};