import React, { useEffect, useState } from 'react';

interface Project {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-matrix text-matrix-neon mb-4 animate-glow">
            // PROJECT_ARCHIVES
          </h2>
          <div className="w-32 h-px bg-matrix-neon mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`
                bg-matrix-subtle border border-matrix-neon/30 p-6 cursor-pointer
                transform transition-all duration-500 hover:scale-105 hover:border-matrix-neon
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${hoveredProject === project.name ? 'shadow-lg shadow-matrix-neon/20' : ''}
              `}
              style={{ 
                transitionDelay: `${index * 200}ms` 
              }}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-matrix-neon font-matrix">▶</span>
                  <h3 className="font-matrix text-lg text-matrix-neon">
                    {project.name.toUpperCase()}
                  </h3>
                </div>
                <span className={`px-2 py-1 border text-xs font-matrix ${
                  project.category === 'Robotics' ? 'border-red-500 text-red-500' :
                  project.category === 'Web Development' ? 'border-blue-500 text-blue-500' :
                  project.category === 'Hardware Design' ? 'border-purple-500 text-purple-500' :
                  project.category === 'PCB Engineering' ? 'border-orange-500 text-orange-500' :
                  project.category === 'Hardware/Software Co-design' ? 'border-cyan-500 text-cyan-500' :
                  'border-matrix-muted text-matrix-muted'
                }`}>
                  {project.category.toUpperCase()}
                </span>
              </div>

              {/* Project Image */}
              {project.image && (
                <div className="relative mb-4 overflow-hidden group">
                  <div className="relative aspect-video bg-matrix-void border border-matrix-neon/50">
                    <img 
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      style={{
                        filter: 'sepia(100%) hue-rotate(90deg) saturate(200%) brightness(0.8) contrast(1.2)',
                      }}
                    />
                    {/* Matrix overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 mix-blend-overlay" />
                    
                    {/* Scan lines effect */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="h-full w-full" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                      }} />
                    </div>
                    
                    {/* Hover scan line animation */}
                    {hoveredProject === project.name && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-matrix-neon to-transparent animate-pulse opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-matrix-neon to-transparent animate-pulse opacity-80" 
                             style={{ animationDelay: '0.5s' }} />
                        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-matrix-neon to-transparent animate-pulse opacity-80" 
                             style={{ animationDelay: '0.25s' }} />
                        <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-matrix-neon to-transparent animate-pulse opacity-80" 
                             style={{ animationDelay: '0.75s' }} />
                      </div>
                    )}
                    
                    {/* Corner brackets effect on hover */}
                    {hoveredProject === project.name && (
                      <>
                        {/* Top corners */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-matrix-neon animate-pulse" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-matrix-neon animate-pulse" />
                        {/* Bottom corners */}
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-matrix-neon animate-pulse" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-matrix-neon animate-pulse" />
                      </>
                    )}
                  </div>
                  
                  {/* Image caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-matrix-void/90 to-transparent p-2">
                    <div className="font-matrix text-xs text-matrix-neon opacity-80">
                      PROJECT_IMAGE.{project.category.replace(' ', '_').toUpperCase()}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Description */}
              <p className="font-matrix text-sm text-matrix-terminal mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="font-matrix text-xs text-matrix-muted mb-2">
                  TECHNOLOGIES:
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-matrix-void border border-matrix-neon/50 font-matrix text-xs text-matrix-terminal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="flex items-center justify-between">
                <div className="font-matrix text-xs text-matrix-muted">
                  CLICK TO ANALYZE
                </div>
                <div className={`w-2 h-2 ${
                  hoveredProject === project.name ? 'bg-matrix-neon animate-pulse' : 'bg-matrix-muted'
                } transition-all duration-300`} />
              </div>

              {/* Scan Line Effect on Hover */}
              {hoveredProject === project.name && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-matrix-neon to-transparent animate-pulse" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-matrix-neon to-transparent animate-pulse" 
                       style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className={`mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-1000`}>
          <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 text-center">
            <div className="text-3xl font-matrix text-matrix-neon mb-2">
              {projects.length}
            </div>
            <div className="font-matrix text-sm text-matrix-terminal">
              PROJECTS COMPLETED
            </div>
          </div>
          
          <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 text-center">
            <div className="text-3xl font-matrix text-matrix-neon mb-2">
              {projects.filter(p => p.category.includes('Hardware') || p.category === 'PCB Engineering' || p.category.includes('Co-design')).length}
            </div>
            <div className="font-matrix text-sm text-matrix-terminal">
              HARDWARE SYSTEMS
            </div>
          </div>
          
          <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 text-center">
            <div className="text-3xl font-matrix text-matrix-neon mb-2">
              {projects.filter(p => p.category === 'Robotics').length}
            </div>
            <div className="font-matrix text-sm text-matrix-terminal">
              ROBOTICS SYSTEMS
            </div>
          </div>
          
          <div className="bg-matrix-subtle border border-matrix-neon/50 p-6 text-center">
            <div className="text-3xl font-matrix text-matrix-neon mb-2">
              {projects.filter(p => p.category === 'Web Development').length}
            </div>
            <div className="font-matrix text-sm text-matrix-terminal">
              WEB APPLICATIONS
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-matrix-subtle border border-matrix-neon max-w-4xl w-full p-8 animate-glitch max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-matrix text-matrix-neon">
                {selectedProject.name.toUpperCase()} - ANALYSIS
              </h3>
              <button 
                onClick={closeModal}
                className="text-matrix-neon hover:text-matrix-muted transition-colors font-matrix text-xl"
              >
                [ X ]
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative overflow-hidden group">
                  <div className="relative aspect-video bg-matrix-void border border-matrix-neon/50">
                    <img 
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'sepia(100%) hue-rotate(90deg) saturate(200%) brightness(0.9) contrast(1.1)',
                      }}
                    />
                    {/* Matrix overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 mix-blend-overlay" />
                    
                    {/* Scan lines effect */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="h-full w-full" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                      }} />
                    </div>
                    
                    {/* Corner brackets */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-matrix-neon animate-pulse" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-matrix-neon animate-pulse" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-matrix-neon animate-pulse" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-matrix-neon animate-pulse" />
                  </div>
                  
                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-matrix-void/95 to-transparent p-3">
                    <div className="font-matrix text-xs text-matrix-neon">
                      VISUAL_DATA.{selectedProject.category.replace(' ', '_').toUpperCase()}.JPG
                    </div>
                    <div className="font-matrix text-xs text-matrix-muted mt-1">
                      SECURITY_CLEARANCE: AUTHORIZED
                    </div>
                  </div>
                </div>
              )}
              
              {/* Project Details */}
              <div className="space-y-4">
                <div>
                  <div className="font-matrix text-sm text-matrix-muted mb-2">PROJECT TYPE:</div>
                  <div className="font-matrix text-matrix-terminal">{selectedProject.category}</div>
                </div>
                
                <div>
                  <div className="font-matrix text-sm text-matrix-muted mb-2">DESCRIPTION:</div>
                  <div className="font-matrix text-matrix-terminal leading-relaxed">
                    {selectedProject.description}
                  </div>
                </div>
                
                <div>
                  <div className="font-matrix text-sm text-matrix-muted mb-2">TECHNOLOGIES UTILIZED:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <div key={index} className="font-matrix text-matrix-terminal flex items-center">
                        <span className="text-matrix-neon mr-2">▶</span>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* GitHub Repository Link */}
                {selectedProject.github && (
                  <div>
                    <div className="font-matrix text-sm text-matrix-muted mb-2">REPOSITORY ACCESS:</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-matrix-neon mr-2">▶</span>
                      <a 
                        href={`https://github.com/${selectedProject.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-matrix text-matrix-terminal hover:text-matrix-neon transition-colors underline"
                      >
                        GITHUB.COM/{selectedProject.github.toUpperCase()}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t border-matrix-neon/30">
                  <div className="font-matrix text-xs text-matrix-muted text-center">
                    PROJECT STATUS: COMPLETED | MATRIX PROTOCOL: ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;