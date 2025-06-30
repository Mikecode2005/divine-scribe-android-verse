
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, onClick, className = '' }: FeatureCardProps) => {
  return (
    <div 
      className={`glass-effect p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl group ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-biblical-gold/20 rounded-full group-hover:bg-biblical-gold/30 transition-colors duration-300">
          <Icon className="h-8 w-8 text-biblical-gold" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-white">{title}</h3>
        <p className="text-biblical-cream/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
