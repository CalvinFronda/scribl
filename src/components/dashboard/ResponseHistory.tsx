import React, { useState } from 'react';
import { Edit3, Eye, EyeOff } from 'lucide-react';
import { Response } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ResponseHistoryProps {
  responses: Response[];
  loading: boolean;
  onEditResponse: (response: Response) => void;
}

export const ResponseHistory: React.FC<ResponseHistoryProps> = ({
  responses,
  loading,
  onEditResponse
}) => {
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your responses...</p>
        </CardContent>
      </Card>
    );
  }

  if (responses.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <p className="text-muted-foreground">No responses yet. Start writing to see your history here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Your Writing History</h3>
      
      {responses.map((response: any) => (
        <Card key={response.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium mb-1">
                  {formatDate(response.prompts?.date || response.created_at)}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  "{response.prompts?.prompt_text || 'Prompt text unavailable'}"
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {response.is_public ? (
                  <Eye className="h-4 w-4 text-green-600" title="Public response" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" title="Private response" />
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditResponse(response)}
                >
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
            
            <div>
              {expandedResponse === response.id ? (
                <div>
                  <p className="leading-relaxed mb-3">{response.response_text}</p>
                  <button
                    onClick={() => setExpandedResponse(null)}
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Show less
                  </button>
                </div>
              ) : (
                <div>
                  <p className="leading-relaxed mb-3">
                    {truncateText(response.response_text)}
                  </p>
                  {response.response_text.length > 150 && (
                    <button
                      onClick={() => setExpandedResponse(response.id)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Read more
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                {response.updated_at !== response.created_at 
                  ? `Updated ${formatDate(response.updated_at)}`
                  : `Submitted ${formatDate(response.created_at)}`}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};