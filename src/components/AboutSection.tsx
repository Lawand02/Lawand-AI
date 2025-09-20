import React, { useEffect, useState } from 'react';

interface Language {
  name: string;
  proficiency: string;
}

interface ExperienceArea {
  title: string;
  description: string;
}

interface AboutData {
  personal: {
    name: string;
    title: string;
    organization: string;
    location: string;
    phone: string;
    bio: string;
  };
  languages: Language[];
  experience_areas: ExperienceArea[];
}

interface AboutSectionProps {
  data: AboutData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-matrix text-matrix-neon mb-4 animate-glow">
            // ABOUT_PROTOCOL
          </h2>
          <div className="w-32 h-px bg-matrix-neon mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Data Stream */}
          <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
            <div className="bg-matrix-subtle border border-matrix-neon/50 p-6">
              <h3 className="text-xl font-matrix text-matrix-neon mb-4 flex items-center">
                <span className="mr-2">▶</span>
                DATA_STREAM.txt
              </h3>
              
              <div className="space-y-3 font-matrix text-sm">
                <div className="flex">
                  <span className="text-matrix-muted w-24">name:</span>
                  <span className="text-matrix-terminal">{data.personal.name}</span>
                </div>
                <div className="flex">
                  <span className="text-matrix-muted w-24">role:</span>
                  <span className="text-matrix-terminal">{data.personal.title}</span>
                </div>
                <div className="flex">
                  <span className="text-matrix-muted w-24">org:</span>
                  <span className="text-matrix-terminal">{data.personal.organization}</span>
                </div>
                <div className="flex">
                  <span className="text-matrix-muted w-24">location:</span>
                  <span className="text-matrix-terminal">{data.personal.location}</span>
                </div>
                <div className="flex">
                  <span className="text-matrix-muted w-24">contact:</span>
                  <span className="text-matrix-terminal">{data.personal.phone}</span>
                </div>
              </div>
            </div>

            {/* Languages Matrix */}
            <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 mt-6">
              <h3 className="text-xl font-matrix text-matrix-neon mb-4 flex items-center">
                <span className="mr-2">▶</span>
                LANGUAGE_PROTOCOLS
              </h3>
              
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between font-matrix text-sm">
                    <span className="text-matrix-terminal">{lang.name}</span>
                    <span className={`px-2 py-1 border ${
                      lang.proficiency === 'Native' ? 'border-matrix-neon text-matrix-neon' :
                      lang.proficiency === 'Excellent' ? 'border-matrix-muted text-matrix-muted' :
                      'border-matrix-terminal text-matrix-terminal'
                    }`}>
                      {lang.proficiency.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Areas */}
          <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-300`}>
            <div className="bg-matrix-subtle border border-matrix-neon/50 p-6">
              <h3 className="text-xl font-matrix text-matrix-neon mb-4 flex items-center">
                <span className="mr-2">▶</span>
                EXPERTISE_MATRIX
              </h3>
              
              <div className="space-y-6">
                {data.experience_areas.map((area, index) => (
                  <div key={index} className="border-l-2 border-matrix-neon/30 pl-4">
                    <h4 className="font-matrix text-matrix-neon text-lg mb-2">
                      {area.title.toUpperCase()}
                    </h4>
                    <p className="font-matrix text-sm text-matrix-terminal leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 mt-6">
              <h3 className="text-xl font-matrix text-matrix-neon mb-4 flex items-center">
                <span className="mr-2">▶</span>
                MISSION_STATEMENT
              </h3>
              
              <div className="font-matrix text-sm text-matrix-terminal leading-relaxed">
                <p className="mb-3">
                  "In this digital realm, I architect solutions that bridge the gap between 
                  imagination and reality. Every line of code, every pixel, every algorithm 
                  serves a purpose in the greater matrix of technological advancement."
                </p>
                
                <div className="text-matrix-muted text-xs mt-4">
                  - LAWAND YOUSEF, MATRIX PROTOCOL 2.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;