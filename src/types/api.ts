export interface APIResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface APIError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export interface ListCanvasesParams {
  page?: number;
  limit?: number;
  search?: string;
  isPublic?: boolean;
}

export interface CreateCanvasRequest {
  title: string;
  topic: string;
  isPublic?: boolean;
}

export interface UpdateCanvasRequest {
  title?: string;
  canvasData?: {
    nodes: any[];
    edges: any[];
  };
  isPublic?: boolean;
}