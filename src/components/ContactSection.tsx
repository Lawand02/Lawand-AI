import React, { useState, useEffect } from 'react';

interface PersonalData {
  name: string;
  title: string;
  organization: string;
  location: string;
  phone: string;
}

interface ContactSectionProps {
  personal: PersonalData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Initialize terminal
          setTimeout(() => {
            setTerminalOutput([
              'Matrix Protocol Contact Interface v2.0 initialized...',
              'Contact channels established...',
              'Ready to display connection details.'
            ]);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-matrix text-matrix-neon mb-4 animate-glow">
            // CONTACT_PROTOCOL
          </h2>
          <div className="w-32 h-px bg-matrix-neon mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Information Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Direct Contact Information */}
            <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
              <div className="bg-matrix-subtle border border-matrix-neon/50 p-8">
                <h3 className="text-2xl font-matrix text-matrix-neon mb-6 flex items-center">
                  <span className="mr-3">▶▶</span>
                  DIRECT_CONNECTION
                </h3>
                
                <div className="space-y-6">
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-neon font-matrix text-lg">◉</div>
                      <div>
                        <div className="font-matrix text-sm text-matrix-muted">IDENTITY:</div>
                        <div className="font-matrix text-matrix-terminal">{personal.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-neon font-matrix text-lg">◉</div>
                      <div>
                        <div className="font-matrix text-sm text-matrix-muted">ROLE:</div>
                        <div className="font-matrix text-matrix-terminal">{personal.title}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-neon font-matrix text-lg">◉</div>
                      <div>
                        <div className="font-matrix text-sm text-matrix-muted">ORGANIZATION:</div>
                        <div className="font-matrix text-matrix-terminal">{personal.organization}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-neon font-matrix text-lg">◉</div>
                      <div>
                        <div className="font-matrix text-sm text-matrix-muted">LOCATION:</div>
                        <div className="font-matrix text-matrix-terminal">{personal.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-neon font-matrix text-lg">◉</div>
                      <div>
                        <div className="font-matrix text-sm text-matrix-muted">PHONE:</div>
                        <div className="font-matrix text-matrix-terminal">{personal.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="border-t border-matrix-neon/30 pt-6">
                    <h4 className="font-matrix text-matrix-neon mb-3">SYSTEM STATUS:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-matrix text-sm text-matrix-terminal">Connection</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-matrix-neon animate-pulse"></div>
                          <span className="font-matrix text-xs text-matrix-neon">ONLINE</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-matrix text-sm text-matrix-terminal">Availability</span>
                        <span className="font-matrix text-xs text-matrix-terminal">24/7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-matrix text-sm text-matrix-terminal">Response Time</span>
                        <span className="font-matrix text-xs text-matrix-terminal">&lt; 24 HOURS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Interface Display */}
            <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-300`}>
              <div className="bg-matrix-subtle border border-matrix-neon/50 p-8">
                <h3 className="text-2xl font-matrix text-matrix-neon mb-6 flex items-center">
                  <span className="mr-3">▶▶</span>
                  ACCESS_TERMINAL
                </h3>
                
                {/* Terminal Output */}
                <div className="bg-matrix-void border border-matrix-neon/30 p-4 mb-6 h-48 overflow-y-auto">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="font-matrix text-xs text-matrix-terminal mb-1">
                      {line}
                    </div>
                  ))}
                  <div className="font-matrix text-xs text-matrix-neon">
                    <div className="mb-1">$ contact --info</div>
                    <div className="mb-1 text-matrix-terminal">Name: {personal.name}</div>
                    <div className="mb-1 text-matrix-terminal">Phone: {personal.phone}</div>
                    <div className="mb-1 text-matrix-terminal">Location: {personal.location}</div>
                    <div className="mb-2 text-matrix-terminal">Status: Available for projects</div>
                    <div className="mb-1">$ skills --list</div>
                    <div className="mb-1 text-matrix-terminal">- Web Development (PHP, Laravel)</div>
                    <div className="mb-1 text-matrix-terminal">- Python Development (OpenCV, AI)</div>
                    <div className="mb-1 text-matrix-terminal">- Robotics & Automation</div>
                    <div className="mb-2 text-matrix-terminal">- Graphic Design</div>
                    <div className="flex items-center">
                      <span>$ connection_status</span>
                      <span className="animate-blink text-matrix-neon ml-1">▋</span>
                    </div>
                  </div>
                </div>

                {/* Connection Matrix */}
                <div className="space-y-4">
                  <h4 className="font-matrix text-matrix-neon text-lg">CONNECTION_MATRIX:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-matrix-neon/30 p-3 text-center">
                      <div className="font-matrix text-matrix-neon text-lg mb-1">VOICE</div>
                      <div className="font-matrix text-xs text-matrix-terminal">{personal.phone}</div>
                    </div>
                    <div className="border border-matrix-neon/30 p-3 text-center">
                      <div className="font-matrix text-matrix-neon text-lg mb-1">LOCATION</div>
                      <div className="font-matrix text-xs text-matrix-terminal">{personal.location}</div>
                    </div>
                  </div>
                  
                  <div className="border border-matrix-neon/30 p-4">
                    <div className="font-matrix text-matrix-neon text-sm mb-2">PREFERRED_CONTACT:</div>
                    <div className="font-matrix text-xs text-matrix-terminal">
                      "Direct communication via phone is the most efficient protocol for 
                      establishing project partnerships and technical discussions."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Network Matrix */}
          <div className={`mt-16 bg-matrix-subtle border border-matrix-neon/50 p-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-600`}>
            <h3 className="text-xl font-matrix text-matrix-neon mb-6 text-center">
              PROFESSIONAL_NETWORK_STATUS
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="border border-matrix-neon/30 p-4">
                <div className="text-2xl font-matrix text-matrix-neon mb-2">ACTIVE</div>
                <div className="font-matrix text-sm text-matrix-terminal">PROJECT STATUS</div>
              </div>
              
              <div className="border border-matrix-neon/30 p-4">
                <div className="text-2xl font-matrix text-matrix-neon mb-2">OPEN</div>
                <div className="font-matrix text-sm text-matrix-terminal">FOR COLLABORATION</div>
              </div>
              
              <div className="border border-matrix-neon/30 p-4">
                <div className="text-2xl font-matrix text-matrix-neon mb-2">24/7</div>
                <div className="font-matrix text-sm text-matrix-terminal">AVAILABILITY</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="font-matrix text-matrix-terminal text-sm">
                "In the Matrix, connections create possibilities. 
                Every project is a chance to reshape digital reality."
              </div>
              <div className="font-matrix text-matrix-muted text-xs mt-2">
                - LAWAND YOUSEF, WEB ARCHITECT
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="font-matrix text-matrix-muted text-sm">
            MATRIX PROTOCOL v2.0 | LAWAND YOUSEF PERSONAL PORTFOLIO | 2025
          </div>
          <div className="font-matrix text-matrix-terminal text-xs mt-2">
            "There is no spoon. There is only code."
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;