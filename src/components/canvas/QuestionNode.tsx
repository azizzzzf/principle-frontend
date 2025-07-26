'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuestionNode = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as any;
  const { questions = [], onClose } = nodeData;

  return (
    <Card
      className={cn(
        'min-w-[250px] max-w-[320px] border-purple-200 bg-purple-50/50',
        selected && 'ring-2 ring-purple-500 ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-border"
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-purple-600" />
            </div>
            <CardTitle className="text-sm text-purple-800">
              Questions to Explore
            </CardTitle>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-purple-200"
              onClick={() => onClose(id)}
              title="Close questions"
            >
              <X className="w-3 h-3 text-purple-600" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          {questions.map((question: string, index: number) => (
            <div
              key={index}
              className="text-xs text-purple-700 p-2 bg-white/80 rounded border border-purple-200/50"
            >
              {question}
            </div>
          ))}
        </div>
        
        {questions.length === 0 && (
          <div className="text-xs text-purple-600/60 text-center py-2">
            Loading questions...
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

QuestionNode.displayName = 'QuestionNode';