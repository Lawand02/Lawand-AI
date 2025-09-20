import React, { useState, useEffect } from 'react';

interface BootMessage {
  text: string;
  delay: number;
}

const BootScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const bootMessages: BootMessage[] = [
    { text: 'INITIALIZING MATRIX PROTOCOL...', delay: 500 },
    { text: 'LOADING NEURAL PATHWAYS...', delay: 800 },
    { text: 'AUTHENTICATING USER CREDENTIALS...', delay: 600 },
    { text: 'ESTABLISHING SECURE CONNECTION...', delay: 700 },
    { text: 'ACCESSING LAWAND YOUSEF DATABASE...', delay: 900 },
    { text: 'MATRIX PROTOCOL ACTIVE.', delay: 500 },
    { text: 'WELCOME TO THE REAL WORLD.', delay: 800 },
  ];

  useEffect(() => {
    if (currentMessage >= bootMessages.length) return;

    const message = bootMessages[currentMessage];
    let charIndex = 0;

    const typeWriter = () => {
      if (charIndex < message.text.length) {
        setDisplayedText(message.text.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          setCurrentMessage(currentMessage + 1);
          setDisplayedText('');
        }, message.delay);
      }
    };

    typeWriter();
  }, [currentMessage]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-matrix-void flex items-center justify-center z-50">
      {/* Digital Rain Background (simplified for loading) */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="text-matrix-neon text-xs animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      {/* Boot Messages */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <div className="text-6xl text-matrix-neon font-matrix mb-4 animate-glow">
            M A T R I X
          </div>
          <div className="text-xl text-matrix-terminal font-matrix">
            PROTOCOL v2.0
          </div>
        </div>

        <div className="font-matrix text-lg text-matrix-terminal h-8">
          <span className="inline-block">
            {displayedText}
            {showCursor && <span className="animate-blink">▋</span>}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-96 mx-auto">
          <div className="border border-matrix-neon bg-transparent h-2 rounded-none">
            <div 
              className="bg-matrix-neon h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${(currentMessage / bootMessages.length) * 100}%` 
              }}
            />
          </div>
          <div className="text-matrix-muted text-sm mt-2 font-matrix">
            {Math.round((currentMessage / bootMessages.length) * 100)}% COMPLETE
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;