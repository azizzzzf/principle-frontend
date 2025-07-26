import { useEffect, useCallback } from 'react';
import { wsClient } from './client';
import { useCollaborationStore } from '@/lib/store';
import { debounce } from '@/lib/utils';

export const useWebSocket = (sessionToken?: string) => {
  const { isConnected, setConnected } = useCollaborationStore();

  useEffect(() => {
    if (sessionToken) {
      wsClient.connect(sessionToken);
    }

    return () => {
      if (!sessionToken) {
        wsClient.disconnect();
      }
    };
  }, [sessionToken]);

  const emitNodeMove = useCallback(
    debounce((nodeId: string, position: { x: number; y: number }) => {
      wsClient.emitNodeMove(nodeId, position);
    }, 100),
    []
  );

  const emitCursorMove = useCallback(
    debounce((position: { x: number; y: number }) => {
      wsClient.emitCursorMove(position);
    }, 50),
    []
  );

  return {
    isConnected: wsClient.isConnected(),
    emitNodeMove,
    emitNodeCreate: wsClient.emitNodeCreate.bind(wsClient),
    emitNodeDelete: wsClient.emitNodeDelete.bind(wsClient),
    emitConnectionCreate: wsClient.emitConnectionCreate.bind(wsClient),
    emitConnectionDelete: wsClient.emitConnectionDelete.bind(wsClient),
    emitCursorMove,
    joinSession: wsClient.joinSession.bind(wsClient),
    leaveSession: wsClient.leaveSession.bind(wsClient),
  };
};

export const useCollaboration = (canvasId?: string) => {
  const {
    currentSession,
    participants,
    isConnected,
    userCursors,
  } = useCollaborationStore();

  const { joinSession, leaveSession } = useWebSocket(currentSession?.sessionToken);

  useEffect(() => {
    if (currentSession?.sessionToken) {
      joinSession(currentSession.sessionToken);
    }

    return () => {
      if (currentSession?.sessionToken) {
        leaveSession();
      }
    };
  }, [currentSession?.sessionToken, joinSession, leaveSession]);

  return {
    session: currentSession,
    participants,
    isConnected,
    userCursors,
    participantCount: participants.length,
  };
};