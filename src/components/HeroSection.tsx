import React, { useState, useEffect } from 'react';

interface PersonalData {
  name: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  bio: string;
}

interface HeroSectionProps {
  data: PersonalData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Typing animation for name
    let nameIndex = 0;
    const typeName = () => {
      if (nameIndex < data.name.length) {
        setDisplayedName(data.name.substring(0, nameIndex + 1));
        nameIndex++;
        setTimeout(typeName, 100);
      } else {
        // Start typing title after name
        setTimeout(() => {
          let titleIndex = 0;
          const typeTitle = () => {
            if (titleIndex < data.title.length) {
              setDisplayedTitle(data.title.substring(0, titleIndex + 1));
              titleIndex++;
              setTimeout(typeTitle, 80);
            } else {
              setShowContent(true);
            }
          };
          typeTitle();
        }, 500);
      }
    };

    // Start typing after component mounts
    const delay = setTimeout(typeName, 1000);
    return () => clearTimeout(delay);
  }, [data.name, data.title]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="border border-matrix-neon/20 flex items-center justify-center text-xs"
              style={{
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <span className="animate-pulse">
                {Math.random() > 0.7 ? (Math.random() > 0.5 ? '1' : '0') : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center z-20 max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-matrix text-matrix-neon mb-4 animate-glow">
            {displayedName}
            <span className="animate-blink">▋</span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-matrix text-matrix-terminal mb-2">
            {displayedTitle}
            {!showContent && <span className="animate-blink">▋</span>}
          </div>
          
          {showContent && (
            <div className="text-lg font-matrix text-matrix-muted animate-fade-in">
              {data.organization} - {data.description}
            </div>
          )}
        </div>

        {/* Terminal Window */}
        {showContent && (
          <div className="bg-matrix-subtle border border-matrix-neon max-w-2xl mx-auto p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-matrix-neon/30">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-matrix-neon"></div>
              </div>
              <div className="font-matrix text-xs text-matrix-muted">
                terminal@lawand-protocol
              </div>
            </div>
            
            <div className="text-left font-matrix text-sm">
              <div className="mb-2">
                <span className="text-matrix-neon">$</span>
                <span className="text-matrix-terminal"> whoami</span>
              </div>
              <div className="mb-4 text-matrix-muted">
                {data.bio}
              </div>
              
              <div className="mb-2">
                <span className="text-matrix-neon">$</span>
                <span className="text-matrix-terminal"> locate --user</span>
              </div>
              <div className="mb-4 text-matrix-muted">
                {data.location}
              </div>
              
              <div className="flex items-center">
                <span className="text-matrix-neon">$</span>
                <span className="text-matrix-terminal ml-1"> explore_portfolio</span>
                <span className="animate-blink text-matrix-neon ml-1">▋</span>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        {showContent && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-matrix-neon text-2xl">↓</div>
            <div className="font-matrix text-xs text-matrix-muted">SCROLL TO EXPLORE</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;