'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Lightbulb, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const difficultyIndicators = {
  1: { dots: 1, color: 'bg-green-500' },
  2: { dots: 2, color: 'bg-blue-500' },
  3: { dots: 3, color: 'bg-yellow-500' },
  4: { dots: 4, color: 'bg-orange-500' },
  5: { dots: 5, color: 'bg-red-500' },
} as const;

export const PrincipleNode = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as any;
  const difficulty = nodeData.difficulty || 1;
  const indicator = difficultyIndicators[difficulty as keyof typeof difficultyIndicators];

  return (
    <Card
      className={cn(
        'min-w-[200px] max-w-[280px] transition-all',
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-border"
      />

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div 
              className="font-medium text-sm leading-tight cursor-pointer hover:text-primary transition-colors"
              onClick={() => nodeData.onNodeClick?.(id)}
            >
              {nodeData.label}
            </div>
            
            {nodeData.description && (
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {nodeData.description}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: indicator.dots }).map((_, i) => (
                  <div
                    key={i}
                    className={cn('w-1.5 h-1.5 rounded-full', indicator.color)}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  nodeData.onQuestionClick?.(id);
                }}
                title="Ask questions about this principle"
              >
                <HelpCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-border"
      />
    </Card>
  );
});

PrincipleNode.displayName = 'PrincipleNode';