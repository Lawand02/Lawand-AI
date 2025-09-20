import React, { useEffect, useState } from 'react';

interface Skill {
  name: string;
  category: string;
  level: number;
  details: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate skill levels
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedLevels(prev => ({
                ...prev,
                [skill.name]: skill.level
              }));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [skills]);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as {[key: string]: Skill[]});

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-matrix text-matrix-neon mb-4 animate-glow">
            // SKILLS_MATRIX
          </h2>
          <div className="w-32 h-px bg-matrix-neon mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <div 
              key={category} 
              className={`mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-2xl font-matrix text-matrix-neon mb-6 flex items-center">
                <span className="mr-3">▶▶</span>
                {category.toUpperCase().replace(' ', '_')}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {categorySkills.map((skill, skillIndex) => (
                  <div key={skill.name} className="bg-matrix-subtle border border-matrix-neon/30 p-6 hover:border-matrix-neon transition-all duration-300">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-matrix text-lg text-matrix-neon">
                        {skill.name}
                      </h4>
                      <span className="font-matrix text-sm text-matrix-muted">
                        {animatedLevels[skill.name] || 0}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-matrix-void border border-matrix-neon/50 relative overflow-hidden">
                        {/* Progress Bar Background Grid */}
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute top-0 bottom-0 w-px bg-matrix-neon"
                              style={{ left: `${i * 10}%` }}
                            />
                          ))}
                        </div>
                        
                        {/* Progress Fill */}
                        <div 
                          className="h-full bg-gradient-to-r from-matrix-neon to-matrix-muted transition-all duration-2000 ease-out relative"
                          style={{ 
                            width: `${animatedLevels[skill.name] || 0}%` 
                          }}
                        >
                          {/* Animated scanline effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Skill Details */}
                    <p className="font-matrix text-sm text-matrix-terminal leading-relaxed">
                      {skill.details}
                    </p>
                    
                    {/* Skill Level Indicator */}
                    <div className="mt-3 flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 border border-matrix-neon ${
                            i < Math.floor((animatedLevels[skill.name] || 0) / 20)
                              ? 'bg-matrix-neon'
                              : 'bg-transparent'
                          } transition-all duration-300`}
                          style={{ 
                            transitionDelay: `${i * 100}ms` 
                          }}
                        />
                      ))}
                      <span className="ml-2 font-matrix text-xs text-matrix-muted">
                        LEVEL {Math.floor((animatedLevels[skill.name] || 0) / 20) + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className={`mt-16 bg-matrix-subtle border border-matrix-neon/50 p-8 max-w-4xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-1000`}>
          <h3 className="text-xl font-matrix text-matrix-neon mb-4 text-center">
            SYSTEM CAPABILITIES OVERVIEW
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-matrix text-matrix-neon mb-2">
                {skills.length}
              </div>
              <div className="font-matrix text-sm text-matrix-terminal">
                CORE TECHNOLOGIES
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-matrix text-matrix-neon mb-2">
                {Object.keys(groupedSkills).length}
              </div>
              <div className="font-matrix text-sm text-matrix-terminal">
                EXPERTISE DOMAINS
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-matrix text-matrix-neon mb-2">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
              </div>
              <div className="font-matrix text-sm text-matrix-terminal">
                AVERAGE PROFICIENCY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;