
import React from 'react';
import { Book } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="p-2 bg-biblical-gold rounded-lg animate-glow">
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-white">Divine Scribe</h1>
                <p className="text-biblical-cream/90 text-sm">Your Bible Study Companion</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative">
        {children}
      </main>
      
      <footer className="glass-effect border-t border-white/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-biblical-cream/80">
            <p>&copy; 2024 Divine Scribe. Built with love for God's Word.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
