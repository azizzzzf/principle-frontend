'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Globe, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ConnectionNode = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as any;
  const { connections = [], onConnectionClick } = nodeData;

  return (
    <Card
      className={cn(
        'min-w-[250px] max-w-[320px] border-emerald-200 bg-emerald-50/50',
        selected && 'ring-2 ring-emerald-500 ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-border"
      />

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <Globe className="w-3 h-3 text-emerald-600" />
          </div>
          <CardTitle className="text-sm text-emerald-800">
            Real-World Applications
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {connections.map((connection: any, index: number) => (
            <div
              key={index}
              className="group cursor-pointer rounded-md border border-emerald-200/50 bg-white/80 p-3 text-xs transition-colors hover:bg-emerald-100/50"
              onClick={() => onConnectionClick?.(id, connection)}
            >
              <div className="flex items-center gap-1 font-medium text-emerald-800">
                {connection.title}
                <ExternalLink className="w-3 h-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-1 text-emerald-700 line-clamp-2">
                {connection.description}
              </div>
              {connection.example && (
                <div className="mt-1 italic text-emerald-600">
                  Example: {connection.example}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {connections.length === 0 && (
          <div className="text-xs text-emerald-600/60 text-center py-2">
            Loading real-world connections...
          </div>
        )}
      </CardContent>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-border"
      />
    </Card>
  );
});

ConnectionNode.displayName = 'ConnectionNode';