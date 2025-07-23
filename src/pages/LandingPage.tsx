import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePrompts } from '../hooks/usePrompts';
import { usePublicResponses } from '../hooks/useResponses';
import { supabase } from '../lib/supabase';
import { PromptCard } from '../components/prompts/PromptCard';
import { ResponseForm } from '../components/responses/ResponseForm';
import { PublicResponsesList } from '../components/responses/PublicResponsesList';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';

interface LandingPageProps {
  onAuthClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAuthClick }) => {
  const { user } = useAuth();
  const { currentPrompt, loading: promptLoading } = usePrompts();
  const { responses, loading: responsesLoading, refetch: refetchResponses } = usePublicResponses(currentPrompt?.id);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loadingUserResponse, setLoadingUserResponse] = useState(false);

  useEffect(() => {
    if (user && currentPrompt) {
      checkUserResponse();
    }
  }, [user, currentPrompt]);

  const checkUserResponse = async () => {
    if (!user || !currentPrompt) return;

    setLoadingUserResponse(true);
    try {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('user_id', user.id)
        .eq('prompt_id', currentPrompt.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setUserResponse(data);
    } catch (error) {
      console.error('Error checking user response:', error);
    } finally {
      setLoadingUserResponse(false);
    }
  };

  const handleResponseSubmit = () => {
    checkUserResponse();
    refetchResponses();
  };

  if (promptLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="py-12">
            <LoadingSpinner className="mx-auto mb-4" size="lg" />
            <p className="text-muted-foreground">Loading today's prompt...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentPrompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="py-12">
            <h2 className="text-2xl font-bold mb-4">No Prompt Available</h2>
            <p className="text-muted-foreground mb-6">
              There's no writing prompt available for today. Check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <PromptCard prompt={currentPrompt} />

        {user ? (
          <div className="space-y-8">
            {loadingUserResponse ? (
              <Card className="text-center">
                <CardContent className="py-8">
                  <LoadingSpinner className="mx-auto mb-4" />
                  <p className="text-muted-foreground">Checking your response...</p>
                </CardContent>
              </Card>
            ) : userResponse ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed mb-4">{userResponse.response_text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Submitted on {new Date(userResponse.created_at).toLocaleDateString()}
                      {userResponse.updated_at !== userResponse.created_at && 
                        ` • Updated ${new Date(userResponse.updated_at).toLocaleDateString()}`}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {userResponse.is_public ? 'Public' : 'Private'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <ResponseForm 
                promptId={currentPrompt.id} 
                onSubmit={handleResponseSubmit}
              />
            )}
          </div>
        ) : (
          <Card className="text-center">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold mb-4">Ready to Write?</h3>
              <p className="text-muted-foreground mb-6">
                Join our community of writers and share your response to today's prompt.
              </p>
              <Button onClick={onAuthClick} size="lg">
                Sign Up to Write
              </Button>
            </CardContent>
          </Card>
        )}

        <PublicResponsesList 
          responses={responses} 
          loading={responsesLoading} 
        />
      </div>
    </div>
  );
};