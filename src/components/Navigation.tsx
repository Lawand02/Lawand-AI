import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show navigation after boot sequence
    const timer = setTimeout(() => setIsVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'LAWAND_YOUSEF' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  if (!isVisible) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm border-b border-matrix-neon/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Terminal Prompt */}
          <div className="flex items-center space-x-2 text-matrix-terminal font-matrix text-sm">
            <span className="text-matrix-neon">root@lawand:~$</span>
            <span className="animate-blink">▋</span>
          </div>

          {/* Navigation Commands */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  px-3 py-2 font-matrix text-sm border border-transparent
                  transition-all duration-300 hover:border-matrix-neon hover:glow-text
                  ${
                    activeSection === item.id
                      ? 'text-matrix-neon border-matrix-neon glow-text'
                      : 'text-matrix-terminal hover:text-matrix-muted'
                  }
                `}
              >
                [ {item.label} ]
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;