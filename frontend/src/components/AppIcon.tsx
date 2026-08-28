import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import React from 'react';

export type IconVariant = 'gold' | 'orange' | 'blue' | 'red' | 'purple' | 'emerald' | 'glass' | 'theme' | 'none';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AppIconProps {
  /** Lucide Icon component function, icon name string, or React node */
  icon: LucideIcon | keyof typeof LucideIcons | React.ReactNode;
  /** Color variant badge preset */
  variant?: IconVariant;
  /** Custom stroke color override */
  color?: string;
  /** Custom fill color override */
  fill?: string;
  /** Size preset ('xs' | 'sm' | 'md' | 'lg' | 'xl') or pixel size number */
  size?: IconSize | number;
  /** Custom stroke width */
  strokeWidth?: number;
  /** Whether to render inside a glowing badge background container */
  hasBadge?: boolean;
  /** Whether to add internal container padding */
  hasPadding?: boolean;
  /** Optional text label attached to icon */
  text?: React.ReactNode;
  /** Text placement relative to icon ('right' | 'bottom' | 'left' | 'top') */
  textPosition?: 'right' | 'bottom' | 'left' | 'top';
  /** Custom container wrapper CSS classes */
  className?: string;
  /** Custom CSS classes for the icon element (e.g. animate-spin, animate-pulse) */
  iconClassName?: string;
  /** Optional click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Optional title tooltip */
  title?: string;
}

const PRESET_ICON_SIZES: Record<IconSize, number> = {
  xs: 13,
  sm: 15,
  md: 18,
  lg: 22,
  xl: 30,
};

export const AppIcon: React.FC<AppIconProps> = ({
  icon,
  variant = 'none',
  color,
  fill,
  size = 'md',
  strokeWidth = 2,
  hasBadge = false,
  hasPadding = false,
  text,
  textPosition = 'right',
  className = '',
  iconClassName = '',
  onClick,
  title,
}) => {
  // Resolve numeric icon size
  const iconPixelSize = typeof size === 'number' ? size : PRESET_ICON_SIZES[size] || 18;
  const sizeClass = typeof size === 'string' ? `icon-badge-${size}` : '';

  // Render the Lucide Icon element dynamically
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    let IconComponent: LucideIcon | null = null;
    if (typeof icon === 'string') {
      IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[icon] || null;
    } else if (typeof icon === 'function' || typeof icon === 'object') {
      IconComponent = icon as LucideIcon;
    }

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        size={iconPixelSize}
        color={color}
        fill={fill || 'none'}
        strokeWidth={strokeWidth}
        className={iconClassName}
      />
    );
  };

  const iconElement = renderIcon();

  // If badge is requested or variant is specified
  const content = hasBadge ? (
    <span
      className={`icon-badge ${variant !== 'none' ? `icon-badge-${variant}` : ''} ${sizeClass} ${
        !hasPadding ? 'no-padding' : ''
      } ${onClick ? 'pointer' : ''}`}
      style={!hasPadding ? { padding: 0 } : undefined}
    >
      {iconElement}
    </span>
  ) : (
      iconElement
  );

  // If no text is provided, return icon directly
  if (!text) {
    return onClick ? (
      <span onClick={onClick} title={title} className={`inline-flex items-center ${className}`}>
        {content}
      </span>
    ) : (
      content
    );
  }

  // Flex direction mapping for text position
  const textFlexClasses: Record<string, string> = {
    right: 'flex-row items-center gap-2',
    left: 'flex-row-reverse items-center gap-2',
    bottom: 'flex-col items-center gap-1',
    top: 'flex-col-reverse items-center gap-1',
  };

  return (
    <div
      onClick={onClick}
      title={title}
      className={`inline-flex ${textFlexClasses[textPosition] || 'flex-row items-center gap-2'} ${
        onClick ? 'pointer' : ''
      } ${className}`}
    >
      {content}
      {typeof text === 'string' ? <span>{text}</span> : text}
    </div>
  );
};
