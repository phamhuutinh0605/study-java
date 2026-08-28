import { Film, Globe, Tv, Video, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Logo } from './Logo';
import { AppIcon } from './AppIcon';

export const Footer: React.FC = () => {
  const [language, setLanguage] = useState<'EN' | 'VI'>('EN');

  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        {/* Brand & Mission */}
        <div>
          <div className="footer-logo-box">
            <Logo size="sm" />
          </div>
          <div className="footer-icons-row">
            <Film size={20} className="pointer" />
            <Tv size={20} className="pointer" />
            <Video size={20} className="pointer" />
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h4 className="footer-col-title">
            <AppIcon icon={Compass} variant="blue" size="xs" text="Navigation" />
          </h4>
          <ul className="footer-links-list">
            <li className="pointer">FAQ</li>
            <li className="pointer">Investor Relations</li>
            <li className="pointer">Ways to Watch</li>
            <li className="pointer">Corporate Information</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="footer-col-title">
            <AppIcon icon={ShieldCheck} variant="emerald" size="xs" text="Legal & Support" />
          </h4>
          <ul className="footer-links-list">
            <li className="pointer">Help Center</li>
            <li className="pointer">Terms of Use</li>
            <li className="pointer">Privacy Policy</li>
            <li className="pointer">Cookie Preferences</li>
          </ul>
        </div>

        {/* Column 3: Tech & Language */}
        <div>
          <h4 className="footer-col-title">
            <AppIcon icon={Sparkles} variant="gold" size="xs" text="System Info" />
          </h4>
          <div>
            <button
              onClick={() => setLanguage(language === 'EN' ? 'VI' : 'EN')}
              className="btn-surprise"
            >
              <AppIcon icon={Globe} variant="glass" size="xs" text={`Language: ${language === 'EN' ? 'English (US)' : 'Tiếng Việt'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div>&copy; 2026 Netflix Clone App</div>
        <div className="footer-tech-info">
          4K Ultra HD &bull; Dolby Atmos &bull; Spatial Audio Support
        </div>
      </div>
    </footer>
  );
};
