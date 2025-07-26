import type { CanvasNode } from './canvas';

export interface CollaborationSession {
  id: string;
  canvasId: string;
  sessionToken: string;
  expiresAt: string;
  participants: SessionParticipant[];
  createdAt: string;
}

export interface SessionParticipant {
  userId: string;
  email: string;
  joinedAt: string;
  cursor?: { x: number; y: number };
  color: string;
}

export interface WebSocketEvents {
  'node:move': { nodeId: string; position: { x: number; y: number }; userId: string };
  'node:create': { node: CanvasNode; userId: string };
  'node:delete': { nodeId: string; userId: string };
  'connection:create': { source: string; target: string; userId: string };
  'connection:delete': { edgeId: string; userId: string };
  'user:cursor': { userId: string; position: { x: number; y: number } };
  'user:join': { participant: SessionParticipant };
  'user:leave': { userId: string };
}

export interface CreateSessionRequest {
  canvasId: string;
}

export interface CreateSessionResponse {
  session: CollaborationSession;
  shareUrl: string;
}

export interface JoinSessionRequest {
  sessionToken: string;
}