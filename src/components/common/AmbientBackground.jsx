import React, { useEffect, useRef } from 'react';
import './AmbientBackground.css';

export default function AmbientBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      // Smoothly update CSS variables for mouse position
      const xOffset = (clientX / window.innerWidth - 0.5) * 20; // 20px max movement
      const yOffset = (clientY / window.innerHeight - 0.5) * 20;
      
      bgRef.current.style.setProperty('--mouse-x', `${xOffset}px`);
      bgRef.current.style.setProperty('--mouse-y', `${yOffset}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="luxury-ambient-bg" ref={bgRef}>
      <div className="luxury-bg-canvas"></div>
      
      {/* Mesh Gradient Light Fields */}
      <div className="luxury-mesh-container">
        <div className="luxury-orb orb-1"></div>
        <div className="luxury-orb orb-2"></div>
        <div className="luxury-orb orb-3"></div>
      </div>
      
      {/* Atmospheric Haze */}
      <div className="luxury-atmosphere"></div>
    </div>
  );
}
