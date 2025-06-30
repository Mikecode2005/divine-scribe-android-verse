import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AISermon = () => {
  const [apiKey, setApiKey] = useState('');
  const [verseText, setVerseText] = useState('');
  const [sermon, setSermon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSermon = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your DeepSeek API key to generate sermons.",
        variant: "destructive"
      });
      return;
    }

    if (!verseText.trim()) {
      toast({
        title: "Verse Required",
        description: "Please enter a Bible verse to create a sermon about.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a thoughtful pastor creating inspiring sermons. Create meaningful, uplifting sermons that help people understand and apply biblical teachings to their daily lives.'
            },
            {
              role: 'user',
              content: `Create a short sermon (300-400 words) based on this Bible verse: "${verseText}". Include practical applications and encouragement for daily life.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generatedSermon = data.choices[0]?.message?.content || 'Unable to generate sermon at this time.';
      setSermon(generatedSermon);
      
      toast({
        title: "Sermon Generated",
        description: "Your AI-powered sermon is ready!",
      });
    } catch (error) {
      console.error('Error generating sermon:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate sermon. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <MessageSquare className="h-8 w-8 text-biblical-blue" />
        <h2 className="text-3xl font-serif font-bold text-white">AI Sermon Generator</h2>
      </div>

      <Card className="glass-effect border-white/20 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">DeepSeek API Key</label>
            <Input
              type="password"
              placeholder="Enter your DeepSeek API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <p className="text-biblical-cream/70 text-sm mt-1">
              Get your free API key from <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-biblical-blue hover:underline">DeepSeek Platform</a>
            </p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Bible Verse or Passage</label>
            <Textarea
              placeholder="Enter the Bible verse or passage for your sermon..."
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
            />
          </div>

          <Button 
            onClick={generateSermon}
            disabled={isLoading}
            className="w-full blue-gradient text-white hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Sermon...
              </>
            ) : (
              'Generate AI Sermon'
            )}
          </Button>
        </div>
      </Card>

      {sermon && (
        <Card className="glass-effect border-white/20 p-8">
          <h3 className="text-2xl font-serif text-biblical-blue mb-6 text-center">Your AI-Generated Sermon</h3>
          <div className="prose prose-invert max-w-none">
            <div className="text-biblical-cream leading-relaxed text-lg font-serif whitespace-pre-wrap">
              {sermon}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AISermon;
