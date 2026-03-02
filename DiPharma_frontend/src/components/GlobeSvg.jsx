import React, { useEffect, useRef, useState } from 'react';
// 1. IMPORT YOUR IMAGE HERE
// Make sure globe.jpg is in the same folder as this component
// If you are using Next.js, this might be '/globe.jpg'
import GlobeImg from '../assets/about/globe.png';


const GlobeSvg = () => {
  // 2. CONFIGURATION
  // Aspect ratio based on standard images (adjust viewBox if your image is square)
  const viewBoxWidth = 800;
  const viewBoxHeight = 533;
  const containerRef = useRef(null);
const [inView, setInView] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        setInView(false); // 👈 allows re-animation when scrolling back
      }
    },
    {
      threshold: 0.35,
    }
  );

  if (containerRef.current) {
    observer.observe(containerRef.current);
  }

  return () => {
    if (containerRef.current) {
      observer.unobserve(containerRef.current);
    }
  };
}, []);



  // Pin Coordinates: x (0-800), y (0-533)
  // Adjust these numbers to move pins to specific cities on your background image
  const pins = [
    { id: 1, x: 200, y: 320, delay: '0.2s', label: "Americas" },
    { id: 2, x: 380, y: 200, delay: '0.5s', label: "Europe" },
    { id: 3, x: 440, y: 360, delay: '0.8s', label: "Africa" },
    { id: 4, x: 600, y: 240, delay: '1.1s', label: "Asia" },
    { id: 5, x: 700, y: 450, delay: '1.4s', label: "Oceania" },
  ];

  return (
    <div className="flex justify-center items-center w-full min-h-[600px] bg-black">
      
      {/* CONTAINER: Must be relative to hold the absolute overlay */}
      <div
  ref={containerRef}
  className={`relative w-full max-w-[800px] ${inView ? 'in-view' : ''}`}
  style={{ aspectRatio: `${viewBoxWidth}/${viewBoxHeight}` }}
>
        
        {/* --- LAYER 1: THE BACKGROUND IMAGE --- */}
        <img 
          src={GlobeImg} 
          alt="World Map Background" 
          className="w-full h-full object-cover block"
        />

        {/* --- LAYER 2: THE SVG OVERLAY --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          
          {/* Internal Styles for Animations */}
          <style>{`
            @keyframes pinPop {
              0% { opacity: 0; transform: scale(0) translateY(50px); }
              60% { opacity: 1; transform: scale(1.1) translateY(-10px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes pulseRing {
              0% { transform: scale(0.8); opacity: 0.8; }
              100% { transform: scale(2); opacity: 0; }
            }
            .pin-container {
              transform-box: fill-box;
              transform-origin: bottom center;
              opacity: 0; /* Start hidden */
            }
              .in-view .pin-container {
  animation: pinPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
            .pulse-circle {
              transform-origin: center;
              opacity: 0;
            }
              .in-view .pulse-circle {
  opacity: 1;
  animation: pulseRing 2s infinite ease-out;
}
          `}</style>

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow Filter */}
              <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pin Path Definition */}
              <path 
                id="pinIcon" 
                d="M0 0 C-12 -18 -22 -28 -22 -40 C-22 -52 -12 -62 0 -62 C12 -62 22 -52 22 -40 C22 -28 12 -18 0 0 Z"
              />
            </defs>

            {pins.map((pin) => (
              <g key={pin.id} transform={`translate(${pin.x}, ${pin.y})`}>
                
                {/* The Animated Group */}
                <g className="pin-container" style={{ animationDelay: pin.delay }}>
                  
                  {/* 1. Pulsing Floor Ring */}
                  <circle 
                    cx="0" cy="0" r="8" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.6)" 
                    strokeWidth="2"
                    className="pulse-circle"
                    style={{ animationDelay: pin.delay }}
                  />

                  {/* 2. The Pin Shape */}
                  <use 
                    href="#pinIcon" 
                    fill="white" 
                    filter="url(#pin-glow)" 
                  />

                  {/* 3. Inner Blue Dot */}
                  <circle cx="0" cy="-40" r="7" fill="#1a237e" />
                </g>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GlobeSvg;