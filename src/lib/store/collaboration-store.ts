import { create } from 'zustand';
import type { CollaborationSession, SessionParticipant } from '@/types';

interface CollaborationState {
  currentSession: CollaborationSession | null;
  participants: SessionParticipant[];
  isConnected: boolean;
  isHost: boolean;
  userCursors: Record<string, { x: number; y: number }>;
}

interface CollaborationActions {
  setSession: (session: CollaborationSession) => void;
  setParticipants: (participants: SessionParticipant[]) => void;
  addParticipant: (participant: SessionParticipant) => void;
  removeParticipant: (userId: string) => void;
  setConnected: (connected: boolean) => void;
  setIsHost: (isHost: boolean) => void;
  updateUserCursor: (userId: string, position: { x: number; y: number }) => void;
  clearSession: () => void;
}

export const useCollaborationStore = create<CollaborationState & CollaborationActions>(
  (set, get) => ({
    currentSession: null,
    participants: [],
    isConnected: false,
    isHost: false,
    userCursors: {},

    setSession: (currentSession) =>
      set({
        currentSession,
        participants: currentSession.participants,
      }),

    setParticipants: (participants) => set({ participants }),

    addParticipant: (participant) =>
      set((state) => ({
        participants: [...state.participants.filter(p => p.userId !== participant.userId), participant],
      })),

    removeParticipant: (userId) =>
      set((state) => ({
        participants: state.participants.filter((p) => p.userId !== userId),
        userCursors: Object.fromEntries(
          Object.entries(state.userCursors).filter(([id]) => id !== userId)
        ),
      })),

    setConnected: (isConnected) => set({ isConnected }),

    setIsHost: (isHost) => set({ isHost }),

    updateUserCursor: (userId, position) =>
      set((state) => ({
        userCursors: {
          ...state.userCursors,
          [userId]: position,
        },
      })),

    clearSession: () =>
      set({
        currentSession: null,
        participants: [],
        isConnected: false,
        isHost: false,
        userCursors: {},
      }),
  })
);