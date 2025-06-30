
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookText, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const BibleQuiz = () => {
  const [apiKey, setApiKey] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const generateQuiz = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your DeepSeek API key to generate quiz questions.",
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
              content: 'You are a Bible quiz generator. Create multiple choice questions about the Bible with 4 options each. Return ONLY valid JSON format with an array of questions.'
            },
            {
              role: 'user',
              content: 'Generate 5 Bible quiz questions in this exact JSON format: [{"question": "Question text?", "options": ["A", "B", "C", "D"], "correctAnswer": 0}]. Make questions about various Bible topics, characters, and stories.'
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        const parsedQuestions = JSON.parse(content);
        setQuestions(parsedQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setShowAnswer(false);
        setSelectedAnswer(null);
        
        toast({
          title: "Quiz Generated",
          description: "Your Bible quiz is ready! Good luck!",
        });
      } catch (parseError) {
        throw new Error('Failed to parse quiz questions');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate quiz. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowAnswer(false);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <BookText className="h-8 w-8 text-biblical-gold" />
        <h2 className="text-3xl font-serif font-bold text-white">Bible Quiz</h2>
      </div>

      {questions.length === 0 && (
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
              <p className="text-biblical-cream/60 text-sm mt-1">
                Get your free API key from <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-biblical-gold hover:underline">DeepSeek Platform</a>
              </p>
            </div>

            <Button 
              onClick={generateQuiz}
              disabled={isLoading}
              className="w-full gold-gradient text-white hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                'Generate Bible Quiz'
              )}
            </Button>
          </div>
        </Card>
      )}

      {questions.length > 0 && !quizCompleted && (
        <Card className="glass-effect border-white/20 p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-biblical-gold font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-biblical-cream">
                Score: {score}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="gold-gradient h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-xl font-serif text-white mb-6">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  showAnswer
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-100'
                      : selectedAnswer === index
                      ? 'bg-red-500/20 border-red-500 text-red-100'
                      : 'bg-white/10 border-white/20 text-white/60'
                    : selectedAnswer === index
                    ? 'bg-biblical-gold/20 border-biblical-gold text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showAnswer && index === questions[currentQuestion].correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  {showAnswer && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="flex justify-center">
              <Button onClick={nextQuestion} className="gold-gradient text-white">
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          )}
        </Card>
      )}

      {quizCompleted && (
        <Card className="glass-effect border-white/20 p-8 text-center">
          <h3 className="text-3xl font-serif text-biblical-gold mb-4">Quiz Completed!</h3>
          <div className="text-6xl mb-4">
            {score / questions.length >= 0.8 ? '🏆' : score / questions.length >= 0.6 ? '🎉' : '📖'}
          </div>
          <p className="text-2xl text-white mb-6">
            You scored {score} out of {questions.length}
          </p>
          <p className="text-biblical-cream mb-6">
            {score / questions.length >= 0.8 
              ? "Excellent! You have great knowledge of the Bible!" 
              : score / questions.length >= 0.6 
              ? "Good job! Keep studying God's Word!" 
              : "Keep reading and studying the Bible to grow in knowledge!"}
          </p>
          <Button onClick={resetQuiz} className="gold-gradient text-white">
            Take Another Quiz
          </Button>
        </Card>
      )}
    </div>
  );
};

export default BibleQuiz;
