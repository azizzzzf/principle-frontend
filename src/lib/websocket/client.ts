import { io, Socket } from 'socket.io-client';
import { useAuthStore, useCollaborationStore, useCanvasStore } from '@/lib/store';
import type { WebSocketEvents, SessionParticipant } from '@/types';

class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.setupEventListeners();
  }

  connect(sessionToken?: string): void {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';
    const { accessToken } = useAuthStore.getState();

    if (this.socket?.connected) {
      return;
    }

    this.socket = io(wsUrl, {
      auth: {
        token: accessToken,
        sessionToken,
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupSocketEventListeners();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    useCollaborationStore.getState().setConnected(false);
  }

  private setupSocketEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      useCollaborationStore.getState().setConnected(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      useCollaborationStore.getState().setConnected(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnection();
    });

    // Canvas events
    this.socket.on('node:move', (data: WebSocketEvents['node:move']) => {
      const { updateNode } = useCanvasStore.getState();
      updateNode(data.nodeId, { position: data.position });
    });

    this.socket.on('node:create', (data: WebSocketEvents['node:create']) => {
      const { addNode } = useCanvasStore.getState();
      addNode(data.node);
    });

    this.socket.on('node:delete', (data: WebSocketEvents['node:delete']) => {
      const { deleteNode } = useCanvasStore.getState();
      deleteNode(data.nodeId);
    });

    this.socket.on('connection:create', (data: WebSocketEvents['connection:create']) => {
      const { addEdge } = useCanvasStore.getState();
      addEdge({
        id: `edge-${data.source}-${data.target}`,
        source: data.source,
        target: data.target,
        type: 'smoothstep',
      });
    });

    this.socket.on('connection:delete', (data: WebSocketEvents['connection:delete']) => {
      const { deleteEdge } = useCanvasStore.getState();
      deleteEdge(data.edgeId);
    });

    // Collaboration events
    this.socket.on('user:cursor', (data: WebSocketEvents['user:cursor']) => {
      const { updateUserCursor } = useCollaborationStore.getState();
      updateUserCursor(data.userId, data.position);
    });

    this.socket.on('user:join', (data: WebSocketEvents['user:join']) => {
      const { addParticipant } = useCollaborationStore.getState();
      addParticipant(data.participant);
    });

    this.socket.on('user:leave', (data: WebSocketEvents['user:leave']) => {
      const { removeParticipant } = useCollaborationStore.getState();
      removeParticipant(data.userId);
    });
  }

  private setupEventListeners(): void {
    // Listen for auth changes to reconnect with new token
    useAuthStore.subscribe((state, prevState) => {
      if (state.isAuthenticated !== prevState.isAuthenticated) {
        if (state.isAuthenticated && this.socket?.disconnected) {
          this.connect();
        } else if (!state.isAuthenticated && this.socket?.connected) {
          this.disconnect();
        }
      }
    });
  }

  private handleReconnection(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, delay);
  }

  // Canvas operations
  emitNodeMove(nodeId: string, position: { x: number; y: number }): void {
    if (this.socket?.connected) {
      this.socket.emit('node:move', { nodeId, position });
    }
  }

  emitNodeCreate(node: any): void {
    if (this.socket?.connected) {
      this.socket.emit('node:create', { node });
    }
  }

  emitNodeDelete(nodeId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('node:delete', { nodeId });
    }
  }

  emitConnectionCreate(source: string, target: string): void {
    if (this.socket?.connected) {
      this.socket.emit('connection:create', { source, target });
    }
  }

  emitConnectionDelete(edgeId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('connection:delete', { edgeId });
    }
  }

  // Collaboration operations
  emitCursorMove(position: { x: number; y: number }): void {
    if (this.socket?.connected) {
      this.socket.emit('user:cursor', { position });
    }
  }

  joinSession(sessionToken: string): void {
    if (this.socket?.connected) {
      this.socket.emit('join:session', { sessionToken });
    }
  }

  leaveSession(): void {
    if (this.socket?.connected) {
      this.socket.emit('leave:session');
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Export singleton instance
export const wsClient = new WebSocketClient();