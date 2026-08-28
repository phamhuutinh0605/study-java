import React from 'react';
import type { Category } from '../types/movie';
import { Sparkles, Film, Compass, Bookmark, Zap, Rocket, Clapperboard, Smile, Ghost, Flame } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface CategoryBarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  myListCount: number;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  myListCount,
}) => {
  const defaultItems = [
    { slug: 'all', name: 'All Titles', icon: Compass, color: '#38BDF8' },
    { slug: 'trending', name: 'Trending Now', icon: Sparkles, color: '#FBBF24' },
  ];

  const getCategoryIconInfo = (slug?: string) => {
    switch (slug) {
      case 'action':
        return { icon: Zap, color: '#FB923C' };
      case 'sci-fi':
        return { icon: Rocket, color: '#38BDF8' };
      case 'drama':
        return { icon: Clapperboard, color: '#C084FC' };
      case 'comedy':
        return { icon: Smile, color: '#FACC15' };
      case 'horror':
        return { icon: Ghost, color: '#34D399' };
      case 'thriller':
        return { icon: Flame, color: '#F97316' };
      default:
        return { icon: Film, color: '#EF4444' };
    }
  };

  return (
    <div className="category-bar-wrapper hide-scrollbar">
      <span className="category-label">
        Categories:
      </span>

      {defaultItems.map((item) => {
        const isActive = activeCategory === item.slug;
        return (
          <button
            key={item.slug}
            onClick={() => onSelectCategory(item.slug)}
            className={`category-chip ${isActive ? 'active' : ''}`}
          >
            <span className="category-chip-icon">
              <AppIcon icon={item.icon} size={14} color={item.color} hasBadge={false} />
            </span>
            {item.name}
          </button>
        );
      })}

      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const info = getCategoryIconInfo(cat.slug);
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`category-chip ${isActive ? 'active' : ''}`}
          >
            <span className="category-chip-icon">
              <AppIcon icon={info.icon} size={14} color={info.color} hasBadge={false} />
            </span>
            {cat.name}
          </button>
        );
      })}

      {/* My List Pill */}
      <button
        onClick={() => onSelectCategory('my-list')}
        className={`category-chip ${activeCategory === 'my-list' ? 'active' : ''}`}
      >
        <span className="category-chip-icon">
          <AppIcon icon={Bookmark} size={14} color="#EF4444" fill="#EF4444" hasBadge={false} />
        </span>
        My List
        {myListCount > 0 && (
          <span className="navbar-badge">
            {myListCount}
          </span>
        )}
      </button>
    </div>
  );
};
