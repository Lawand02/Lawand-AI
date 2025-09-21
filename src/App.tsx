import React, { useState, useEffect } from 'react';
import DigitalRain from './components/DigitalRain';
import BootScreen from './components/BootScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Load portfolio data
    fetch(`${import.meta.env.BASE_URL}data/portfolio.json`)
      .then(response => response.json())
      .then(data => setPortfolioData(data))
      .catch(error => console.error('Error loading portfolio data:', error));

    // Simulate boot sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !portfolioData) {
    return <BootScreen />;
  }

  return (
    <div className="min-h-screen bg-matrix-void text-matrix-terminal font-matrix overflow-x-hidden relative">
      {/* Digital Rain Background */}
      <DigitalRain />
      
      {/* Scan Lines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10" 
           style={{
             background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
           }}>
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-20">
        <HeroSection data={portfolioData.personal} />
        <AboutSection data={portfolioData} />
        <SkillsSection skills={portfolioData.skills} />
        <ProjectsSection projects={portfolioData.projects} />
        <ContactSection personal={portfolioData.personal} />
      </main>
    </div>
  );
}

export default App;