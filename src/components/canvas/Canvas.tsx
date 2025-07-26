'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PrincipleNode } from './PrincipleNode';
import { QuestionNode } from './QuestionNode';
import { ConnectionNode } from './ConnectionNode';
import { useCanvasStore } from '@/lib/store';
import type { CanvasNode, CanvasEdge } from '@/types';

const nodeTypes = {
  principle: PrincipleNode,
  question: QuestionNode,
  connection: ConnectionNode,
};

interface CanvasProps {
  onNodeClick?: (nodeId: string) => void;
  onQuestionClick?: (nodeId: string) => void;
  onConnectionClick?: (nodeId: string, connection: any) => void;
  readOnly?: boolean;
}

const CanvasFlow = ({
  onNodeClick,
  onQuestionClick,
  onConnectionClick,
  readOnly = false,
}: CanvasProps) => {
  const { 
    nodes: storeNodes, 
    edges: storeEdges, 
    setNodes: setStoreNodes, 
    setEdges: setStoreEdges,
    addEdge: addStoreEdge,
    updateNode,
    markDirty
  } = useCanvasStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Sync store nodes/edges with local state
  useEffect(() => {
    setNodes(storeNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onNodeClick,
        onQuestionClick,
        onConnectionClick,
      }
    })));
  }, [storeNodes, setNodes, onNodeClick, onQuestionClick, onConnectionClick]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  // Update store when local state changes
  useEffect(() => {
    const storeNodeIds = new Set(storeNodes.map(n => n.id));
    const currentNodeIds = new Set(nodes.map(n => n.id));
    
    // Only update store if nodes actually changed
    if (storeNodeIds.size !== currentNodeIds.size || 
        !Array.from(storeNodeIds).every(id => currentNodeIds.has(id))) {
      setStoreNodes(nodes as CanvasNode[]);
    }
  }, [nodes, storeNodes, setStoreNodes]);

  useEffect(() => {
    const storeEdgeIds = new Set(storeEdges.map(e => e.id));
    const currentEdgeIds = new Set(edges.map(e => e.id));
    
    if (storeEdgeIds.size !== currentEdgeIds.size || 
        !Array.from(storeEdgeIds).every(id => currentEdgeIds.has(id))) {
      setStoreEdges(edges as CanvasEdge[]);
    }
  }, [edges, storeEdges, setStoreEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (readOnly) return;
      
      const newEdge: Edge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: false,
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      addStoreEdge(newEdge as CanvasEdge);
      markDirty();
    },
    [readOnly, setEdges, addStoreEdge, markDirty]
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (readOnly) return;
      
      updateNode(node.id, { position: node.position });
      markDirty();
    },
    [readOnly, updateNode, markDirty]
  );

  const onPaneClick = useCallback((event: React.MouseEvent) => {
    // Clear selection when clicking on empty canvas
    if (onNodeClick) {
      onNodeClick('');
    }
  }, [onNodeClick]);

  return (
    <div 
      className="w-full h-full" 
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        onNodeDragStop={readOnly ? undefined : onNodeDragStop}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        panOnDrag={true}
        zoomOnDoubleClick={false}
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap 
          className="!bg-white !border-gray-300"
          nodeColor={(node) => {
            switch (node.type) {
              case 'principle': return '#3b82f6';
              case 'question': return '#8b5cf6';
              case 'connection': return '#10b981';
              default: return '#64748b';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export const Canvas: React.FC<CanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <CanvasFlow {...props} />
    </ReactFlowProvider>
  );
};