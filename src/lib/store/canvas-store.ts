import { create } from 'zustand';
import type { CanvasNode, CanvasEdge, Canvas } from '@/types';

interface CanvasState {
  currentCanvas: Canvas | null;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  selectedNode: CanvasNode | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
  lastSaved: Date | null;
}

interface CanvasActions {
  setCanvas: (canvas: Canvas) => void;
  setNodes: (nodes: CanvasNode[]) => void;
  setEdges: (edges: CanvasEdge[]) => void;
  addNode: (node: CanvasNode) => void;
  updateNode: (nodeId: string, updates: Partial<CanvasNode>) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (edge: CanvasEdge) => void;
  deleteEdge: (edgeId: string) => void;
  setSelectedNode: (node: CanvasNode | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markDirty: () => void;
  markSaved: () => void;
  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  currentCanvas: null,
  nodes: [],
  edges: [],
  selectedNode: null,
  isLoading: false,
  error: null,
  isDirty: false,
  lastSaved: null,

  setCanvas: (canvas) =>
    set({
      currentCanvas: canvas,
      nodes: canvas.nodes,
      edges: canvas.edges,
      isDirty: false,
      lastSaved: new Date(),
    }),

  setNodes: (nodes) =>
    set((state) => ({
      nodes,
      isDirty: true,
    })),

  setEdges: (edges) =>
    set((state) => ({
      edges,
      isDirty: true,
    })),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
      isDirty: true,
    })),

  updateNode: (nodeId, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
      isDirty: true,
    })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode,
      isDirty: true,
    })),

  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
      isDirty: true,
    })),

  deleteEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
      isDirty: true,
    })),

  setSelectedNode: (selectedNode) => set({ selectedNode }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  markDirty: () => set({ isDirty: true }),

  markSaved: () => set({ isDirty: false, lastSaved: new Date() }),

  clearCanvas: () =>
    set({
      currentCanvas: null,
      nodes: [],
      edges: [],
      selectedNode: null,
      isDirty: false,
      lastSaved: null,
      error: null,
    }),
}));