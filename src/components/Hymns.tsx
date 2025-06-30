
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Play, Pause } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface Hymn {
  title: string;
  verses: string[];
  author: string;
}

const Hymns = () => {
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const hymns: Hymn[] = [
    {
      title: "Amazing Grace",
      author: "John Newton",
      verses: [
        "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.",
        "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.",
        "Through many dangers, toils and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home."
      ]
    },
    {
      title: "How Great Thou Art",
      author: "Carl Boberg",
      verses: [
        "O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed:",
        "Then sings my soul, my Savior God, to Thee:\nHow great Thou art, how great Thou art!\nThen sings my soul, my Savior God, to Thee:\nHow great Thou art, how great Thou art!",
        "When Christ shall come with shout of acclamation\nAnd take me home, what joy shall fill my heart!\nThen I shall bow in humble adoration\nAnd there proclaim, my God, how great Thou art!"
      ]
    },
    {
      title: "Holy, Holy, Holy",
      author: "Reginald Heber",
      verses: [
        "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy, merciful and mighty!\nGod in three Persons, blessed Trinity!",
        "Holy, holy, holy! All the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert, and art, and evermore shalt be.",
        "Holy, holy, holy! Though the darkness hide Thee,\nThough the eye of sinful man Thy glory may not see;\nOnly Thou art holy; there is none beside Thee,\nPerfect in power, in love, and purity."
      ]
    }
  ];

  const selectHymn = (hymn: Hymn) => {
    setSelectedHymn(hymn);
    setCurrentVerse(0);
    setIsPlaying(false);
  };

  const nextVerse = () => {
    if (selectedHymn && currentVerse < selectedHymn.verses.length - 1) {
      setCurrentVerse(currentVerse + 1);
    }
  };

  const prevVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <Music className="h-8 w-8 text-biblical-gold" />
        <h2 className="text-3xl font-serif font-bold text-white">Classic Hymns</h2>
      </div>

      {!selectedHymn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hymns.map((hymn, index) => (
            <Card 
              key={index}
              className="glass-effect border-white/20 p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              onClick={() => selectHymn(hymn)}
            >
              <div className="text-center">
                <div className="p-4 bg-biblical-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-biblical-gold" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">{hymn.title}</h3>
                <p className="text-biblical-cream/80">by {hymn.author}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="glass-effect border-white/20 p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-serif text-biblical-gold mb-2">{selectedHymn.title}</h3>
              <p className="text-biblical-cream/80">by {selectedHymn.author}</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <span className="text-biblical-cream">Verse {currentVerse + 1} of {selectedHymn.verses.length}</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-8 mb-8">
              <div className="text-center">
                <div className="text-lg text-biblical-cream leading-relaxed font-serif whitespace-pre-line">
                  <TypewriterText 
                    text={selectedHymn.verses[currentVerse]} 
                    delay={50}
                    className="text-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button 
                onClick={prevVerse}
                disabled={currentVerse === 0}
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Previous Verse
              </Button>
              
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-biblical-gold/20 border-biblical-gold text-biblical-gold hover:bg-biblical-gold hover:text-white"
                variant="outline"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button 
                onClick={nextVerse}
                disabled={currentVerse === selectedHymn.verses.length - 1}
                className="gold-gradient text-white hover:shadow-lg"
              >
                Next Verse
              </Button>
            </div>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => setSelectedHymn(null)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Back to Hymn List
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hymns;
