import React from 'react';
import { Flashlight, Lightbulb, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', onClick, className = '' }) => {
  // Dimensions per size variant
  const dimensions = {
    sm: { width: 105, height: 32 },
    md: { width: 135, height: 40 },
    lg: { width: 190, height: 56 },
  };

  const { width, height } = dimensions[size];

  return (
    <div
      onClick={onClick}
      className={`netflix-curved-logo ${onClick ? 'clickable' : ''} ${className}`}
      title="Netflix"
    >
      {/* Orbiting Spotlight Flashlights & Lightbulb Overlay on Hover */}
      <div className="logo-spotlight-overlay" aria-hidden="true">
        <div className="logo-orbit-ring">
          {/* Top-Left Flashlight */}
          <div className="logo-orbit-item item-flashlight-1">
            <div className="logo-beam beam-flashlight" />
            <Flashlight className="logo-icon icon-flashlight" size={16} />
          </div>

          {/* Bottom-Right Lightbulb */}
          <div className="logo-orbit-item item-bulb">
            <div className="logo-beam beam-bulb" />
            <Lightbulb className="logo-icon icon-bulb" size={16} />
          </div>

          {/* Top-Right Flashlight */}
          <div className="logo-orbit-item item-flashlight-2">
            <div className="logo-beam beam-flashlight-2" />
            <Flashlight className="logo-icon icon-flashlight" size={16} />
          </div>

          {/* Bottom-Left Sparkles */}
          <div className="logo-orbit-item item-sparkles">
            <div className="logo-beam beam-sparkles" />
            <Lightbulb className="logo-icon icon-sparkles" size={14} />
          </div>
        </div>
      </div>

      <svg
        width={width}
        height={height}
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="netflix-svg-canvas"
      >
        <defs>
          {/* Subtle Upward Quadratic Curve Path */}
          <path id="netflix-arc-path" d="M 5,34 Q 80,26 155,34" />

          {/* Dynamic Theme Gradient */}
          <linearGradient id="netflix-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--netflix-red)" />
            <stop offset="50%" stopColor="var(--netflix-red-hover)" />
            <stop offset="100%" stopColor="var(--netflix-red)" />
          </linearGradient>

          {/* Neon Glow & Drop Shadow Filter */}
          <filter id="netflix-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="var(--netflix-red-glow)" floodOpacity="0.8" />
          </filter>
        </defs>

        <text
          fill="url(#netflix-red-grad)"
          filter="url(#netflix-glow-filter)"
          className="netflix-logo-text"
        >
          <textPath href="#netflix-arc-path" startOffset="50%" textAnchor="middle">
            NETFLIX
          </textPath>
        </text>
      </svg>
    </div>
  );
};

