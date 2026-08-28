import React, { useState, useEffect } from 'react';
import { Search, Bell, User, X, Dices, ChevronDown, Sparkles, Settings, LogOut } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Logo } from './Logo';
import { AppIcon } from './AppIcon';

interface NavbarProps {
  onSearch: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  myListCount: number;
  onOpenSurprise: () => void;
  onShowToast?: (text: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  activeCategory,
  onSelectCategory,
  myListCount,
  onOpenSurprise,
  onShowToast,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setIsSearchOpen(false);
  };

  return (
    <header
      className={`navbar-header transition-all duration-500 ${
        isScrolled ? 'navbar-scrolled' : 'navbar-glass'
      }`}
    >
      {/* Left: Brand Logo & Main Navigation */}
      <div className="navbar-left-group">
        <Logo onClick={() => onSelectCategory('all')} size="md" />

        <nav className="navbar-nav">
          <button
            onClick={() => onSelectCategory('all')}
            className={`navbar-nav-item ${activeCategory === 'all' ? 'active' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectCategory('trending')}
            className={`navbar-nav-item ${activeCategory === 'trending' ? 'active' : ''}`}
          >
            Trending
          </button>
          <button
            onClick={() => onSelectCategory('action')}
            className={`navbar-nav-item ${activeCategory === 'action' ? 'active' : ''}`}
          >
            Action
          </button>
          <button
            onClick={() => onSelectCategory('sci-fi')}
            className={`navbar-nav-item ${activeCategory === 'sci-fi' ? 'active' : ''}`}
          >
            Sci-Fi
          </button>
          <button
            onClick={() => onSelectCategory('my-list')}
            className={`navbar-nav-item ${activeCategory === 'my-list' ? 'active' : ''} flex-row items-center`}
          >
            My List
            {myListCount > 0 && (
              <span className="navbar-badge">
                {myListCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="navbar-right-group">
        {/* Palette Theme Switcher */}
        <ThemeSwitcher onShowToast={onShowToast} />

        {/* Surprise Me Button */}
        <button onClick={onOpenSurprise} className="btn-surprise">
          <Dices size={15} color="var(--netflix-red)" />
          <span>Surprise Me</span>
        </button>

        {/* Search Bar */}
        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
          <Search
            size={18}
            className="pointer text-muted hover:text-white transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          {isSearchOpen && (
            <>
              <input
                type="text"
                placeholder="Search movies, genres, cast..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="search-input"
              />
              {searchQuery && (
                <X
                  size={16}
                  className="pointer text-muted"
                  onClick={clearSearch}
                />
              )}
            </>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <div
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative pointer"
          >
            <Bell size={20} color="#FFF" />
            <span className="red-dot-badge" />
          </div>

          {showNotifications && (
            <div className="popover-menu popover-notifications animate-fade-in">
              <div className="popover-notif-header">
                <AppIcon icon={Sparkles} variant="red" size="xs" text="New Arrivals & Recommendations" />
              </div>
              <div className="popover-notif-list">
                <div className="popover-notif-item">
                  <span className="text-match">NEW</span> Interstellar 4K Remastered is now available!
                </div>
                <div className="popover-notif-item">
                  <span className="text-top1-badge">TOP #1</span> The Dark Knight added to Action section.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Popover */}
        <div className="relative">
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex-row items-center pointer"
          >
            <div className="user-avatar-box">
              <User size={18} color="#FFF" />
            </div>
            <ChevronDown size={14} color="#AAA" />
          </div>

          {showProfileMenu && (
            <div className="popover-menu popover-profile animate-fade-in">
              <div className="popover-profile-header">
                <div className="popover-profile-name">Administrator</div>
                <div className="popover-profile-email">admin@netflix.com</div>
              </div>

              <div className="popover-profile-list">
                <button className="menu-item-btn">
                  <User size={16} /> Manage Profiles
                </button>
                <button className="menu-item-btn">
                  <Settings size={16} /> Account & Settings
                </button>
                <button className="menu-item-btn signout">
                  <LogOut size={16} /> Sign Out of Netflix
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

