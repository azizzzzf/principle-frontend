export interface CanvasNode {
  id: string;
  type: 'principle' | 'question' | 'connection';
  position: { x: number; y: number };
  data: {
    label: string;
    description: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    connections: string[];
    icon?: string;
  };
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
}

export interface Canvas {
  id: string;
  userId: string;
  title: string;
  topic: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CanvasData {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export interface DeconstructionRequest {
  topic: string;
}

export interface DeconstructionResponse {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export interface QuestionGenerationRequest {
  nodeId: string;
  principle: string;
}

export interface QuestionGenerationResponse {
  questions: string[];
}

export interface RealWorldConnectionsRequest {
  nodeId: string;
  principle: string;
}

export interface RealWorldConnectionsResponse {
  connections: Array<{
    title: string;
    description: string;
    example: string;
  }>;
}