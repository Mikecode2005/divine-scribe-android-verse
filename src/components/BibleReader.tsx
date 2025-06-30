import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BookOpen, Languages } from 'lucide-react';
import TypewriterText from './TypewriterText';

const BibleReader = () => {
  const [selectedVersion, setSelectedVersion] = useState('KJV');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [currentVerse, setCurrentVerse] = useState({
    book: 'John',
    chapter: '3',
    verse: '16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'
  });

  const versions = [
    { value: 'KJV', label: 'King James Version' },
    { value: 'NIV', label: 'New International Version' },
    { value: 'ESV', label: 'English Standard Version' },
    { value: 'NASB', label: 'New American Standard Bible' }
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Greek', label: 'Greek (Koine)' },
    { value: 'Hebrew', label: 'Hebrew' },
    { value: 'Spanish', label: 'Español' },
    { value: 'French', label: 'Français' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-8 w-8 text-biblical-gold" />
        <h2 className="text-3xl font-serif font-bold text-white">Bible Reader</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-biblical-gold" />
            <label className="text-white font-medium">Version</label>
          </div>
          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-biblical-navy border-white/20">
              {versions.map((version) => (
                <SelectItem key={version.value} value={version.value} className="text-white hover:bg-white/10">
                  {version.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="h-5 w-5 text-biblical-gold" />
            <label className="text-white font-medium">Language</label>
          </div>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-biblical-navy border-white/20">
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value} className="text-white hover:bg-white/10">
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      </div>

      <Card className="glass-effect border-white/20 p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif text-biblical-gold mb-2">
            {currentVerse.book} {currentVerse.chapter}:{currentVerse.verse}
          </h3>
          <div className="text-lg text-biblical-cream leading-relaxed font-serif">
            {selectedLanguage === 'Greek' ? (
              <TypewriterText 
                text="οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν" 
                className="text-xl"
              />
            ) : (
              <TypewriterText 
                text={currentVerse.text} 
                className="text-xl"
              />
            )}
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            Previous
          </Button>
          <Button className="gold-gradient text-white hover:shadow-lg">
            Next Verse
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BibleReader;
