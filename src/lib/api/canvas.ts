import { apiClient } from './client';
import type { 
  Canvas, 
  CreateCanvasRequest, 
  UpdateCanvasRequest,
  ListCanvasesParams,
  PaginatedResponse,
  DeconstructionRequest,
  DeconstructionResponse,
  QuestionGenerationRequest,
  QuestionGenerationResponse,
  RealWorldConnectionsRequest,
  RealWorldConnectionsResponse
} from '@/types';

export const canvasAPI = {
  async list(params: ListCanvasesParams = {}): Promise<PaginatedResponse<Canvas>> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.search) searchParams.set('search', params.search);
    if (params.isPublic !== undefined) searchParams.set('isPublic', params.isPublic.toString());

    const response = await apiClient.get<PaginatedResponse<Canvas>>(
      `/api/v1/canvas/list?${searchParams.toString()}`
    );
    return response.data;
  },

  async get(canvasId: string): Promise<Canvas> {
    const response = await apiClient.get<Canvas>(`/api/v1/canvas/${canvasId}`);
    return response.data;
  },

  async create(data: CreateCanvasRequest): Promise<Canvas> {
    const response = await apiClient.post<Canvas>('/api/v1/canvas/create', data);
    return response.data;
  },

  async update(canvasId: string, data: UpdateCanvasRequest): Promise<Canvas> {
    const response = await apiClient.put<Canvas>(`/api/v1/canvas/${canvasId}`, data);
    return response.data;
  },

  async delete(canvasId: string): Promise<void> {
    await apiClient.delete(`/api/v1/canvas/${canvasId}`);
  },

  async deconstruct(data: DeconstructionRequest): Promise<DeconstructionResponse> {
    const response = await apiClient.post<DeconstructionResponse>('/api/v1/ai/deconstruct', data);
    return response.data;
  },

  async generateQuestions(data: QuestionGenerationRequest): Promise<QuestionGenerationResponse> {
    const response = await apiClient.post<QuestionGenerationResponse>('/api/v1/ai/generate-questions', data);
    return response.data;
  },

  async getRealWorldConnections(data: RealWorldConnectionsRequest): Promise<RealWorldConnectionsResponse> {
    const response = await apiClient.post<RealWorldConnectionsResponse>('/api/v1/ai/real-world-connections', data);
    return response.data;
  },
};