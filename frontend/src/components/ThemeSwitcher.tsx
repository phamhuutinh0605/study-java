import React, { useEffect, useState } from 'react';
import { Check, Palette, ChevronDown } from 'lucide-react';
import { THEME_STORAGE_KEY, themes } from '../constants/themes';
import type { ThemeVariant } from '../types/themes';

interface ThemeSwitcherProps {
  onShowToast?: (text: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onShowToast }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(() => {
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeVariant) || 'red';
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  }, [currentTheme]);

  const handleSelectTheme = (theme: ThemeVariant, name: string) => {
    setCurrentTheme(theme);
    setIsOpen(false);
    if (onShowToast) {
      onShowToast(`Theme switched to "${name}" palette!`);
    }
  };

  const selectedTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="theme-switcher-wrapper">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`theme-selectbox ${isOpen ? 'open' : ''}`}
        title="Select Theme Color"
      >
        <div className="theme-selectbox-left">
          <Palette size={15} color={selectedTheme.color} />
          <span className="theme-selectbox-label">{selectedTheme.name}</span>
        </div>
        <ChevronDown size={14} className={`theme-selectbox-arrow ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="theme-switcher-popover animate-fade-in">
          <div className="theme-switcher-header">Theme Palette</div>
          <div className="theme-switcher-list">
            {themes.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id, t.name)}
                  className={`theme-switcher-item ${isSelected ? 'active' : ''}`}
                >
                  <div className="theme-item-left">
                    <span
                      className="theme-color-dot"
                      style={{ '--dot-color': t.color } as React.CSSProperties}
                    />
                    {t.name}
                  </div>
                  {isSelected && <Check size={14} color={t.color} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
