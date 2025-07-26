import { apiClient } from './client';
import type { 
  CreateSessionRequest,
  CreateSessionResponse,
  JoinSessionRequest,
  CollaborationSession
} from '@/types';

export const collaborationAPI = {
  async createSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    const response = await apiClient.post<CreateSessionResponse>('/api/v1/collaboration/sessions/create', data);
    return response.data;
  },

  async joinSession(sessionToken: string): Promise<CollaborationSession> {
    const response = await apiClient.get<CollaborationSession>(`/api/v1/collaboration/sessions/${sessionToken}/join`);
    return response.data;
  },

  async getSession(sessionToken: string): Promise<CollaborationSession> {
    const response = await apiClient.get<CollaborationSession>(`/api/v1/collaboration/sessions/${sessionToken}`);
    return response.data;
  },

  async leaveSession(sessionToken: string): Promise<void> {
    await apiClient.post(`/api/v1/collaboration/sessions/${sessionToken}/leave`);
  },
};