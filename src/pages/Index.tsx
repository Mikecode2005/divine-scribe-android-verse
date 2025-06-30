
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FeatureCard from '@/components/FeatureCard';
import BibleReader from '@/components/BibleReader';
import AISermon from '@/components/AISermon';
import BibleQuiz from '@/components/BibleQuiz';
import Hymns from '@/components/Hymns';
import TypewriterText from '@/components/TypewriterText';
import { BookOpen, MessageSquare, Music, BookText, Android } from 'lucide-react';

type ActiveSection = 'home' | 'reader' | 'sermon' | 'hymns' | 'quiz';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'reader':
        return <BibleReader />;
      case 'sermon':
        return <AISermon />;
      case 'hymns':
        return <Hymns />;
      case 'quiz':
        return <BibleQuiz />;
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-8">
                    <div className="p-4 bg-biblical-gold rounded-full animate-glow">
                      <Android className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in">
                    <TypewriterText text="Divine Scribe" className="text-6xl md:text-8xl" />
                  </h1>
                  <div className="text-xl md:text-2xl text-biblical-cream/90 mb-8 font-serif animate-slide-in-right">
                    <TypewriterText 
                      text="Your AI-Powered Bible Study Companion for Android" 
                      delay={40}
                    />
                  </div>
                  <p className="text-lg text-biblical-cream/70 max-w-2xl mx-auto animate-fade-in">
                    Explore God's Word with multiple translations, AI-generated sermons, 
                    beautiful hymns, and interactive quizzes - all optimized for your mobile experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-serif font-bold text-center text-white mb-16 animate-fade-in">
                  Discover God's Word Like Never Before
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard
                    icon={BookOpen}
                    title="Bible Reader"
                    description="Read multiple Bible versions in various languages including original Greek and Hebrew texts."
                    onClick={() => setActiveSection('reader')}
                    className="animate-fade-in"
                  />
                  <FeatureCard
                    icon={MessageSquare}
                    title="AI Sermons"
                    description="Generate inspiring sermons from any Bible verse using AI to deepen your understanding."
                    onClick={() => setActiveSection('sermon')}
                    className="animate-fade-in"
                  />
                  <FeatureCard
                    icon={Music}
                    title="Classic Hymns"
                    description="Immerse yourself in timeless hymns with beautiful typography and verse-by-verse reading."
                    onClick={() => setActiveSection('hymns')}
                    className="animate-fade-in"
                  />
                  <FeatureCard
                    icon={BookText}
                    title="Bible Quiz"
                    description="Test your biblical knowledge with AI-generated quizzes covering various topics and difficulty levels."
                    onClick={() => setActiveSection('quiz')}
                    className="animate-fade-in"
                  />
                </div>
              </div>
            </section>

            {/* Mobile App Features */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="glass-effect rounded-2xl p-12 text-center">
                  <Android className="h-20 w-20 text-biblical-gold mx-auto mb-8 animate-glow" />
                  <h3 className="text-3xl font-serif font-bold text-white mb-6">
                    Optimized for Android
                  </h3>
                  <p className="text-lg text-biblical-cream/80 max-w-2xl mx-auto mb-8">
                    Experience smooth animations, offline reading capabilities, and a beautiful 
                    interface designed specifically for mobile Bible study.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center">
                      <div className="text-4xl mb-4">⚡</div>
                      <h4 className="text-xl font-semibold text-biblical-gold mb-2">Fast & Smooth</h4>
                      <p className="text-biblical-cream/70">Lightning-fast performance with beautiful animations</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🌐</div>
                      <h4 className="text-xl font-semibold text-biblical-gold mb-2">Multi-Language</h4>
                      <p className="text-biblical-cream/70">Support for multiple languages including original texts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🤖</div>
                      <h4 className="text-xl font-semibold text-biblical-gold mb-2">AI-Powered</h4>
                      <p className="text-biblical-cream/70">DeepSeek AI integration for sermons and quizzes</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <Layout>
      {activeSection !== 'home' && (
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setActiveSection('home')}
            className="mb-6 text-biblical-gold hover:text-biblical-cream transition-colors duration-200 flex items-center space-x-2"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default Index;
