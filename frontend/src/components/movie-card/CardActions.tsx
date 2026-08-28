import React from 'react';
import { Play, Plus, Check, Info } from 'lucide-react';

interface CardActionsProps {
  onPlay: (e: React.MouseEvent) => void;
  onToggleMyList: (e: React.MouseEvent) => void;
  onSelect: (e: React.MouseEvent) => void;
  isInMyList: boolean;
}

export const CardActions: React.FC<CardActionsProps> = ({
  onPlay,
  onToggleMyList,
  onSelect,
  isInMyList,
}) => {
  return (
    <div className="card-actions-wrapper">
      <div className="card-actions-left">
        <button
          onClick={onPlay}
          className="btn-card-icon play"
          title="Play Trailer"
        >
          <Play size={16} fill="#000" color="#000" />
        </button>

        <button
          onClick={onToggleMyList}
          className={`btn-card-icon list ${isInMyList ? 'active' : ''}`}
          title={isInMyList ? 'Remove from My List' : 'Add to My List'}
        >
          {isInMyList ? <Check size={16} /> : <Plus size={16} />}
        </button>
      </div>

      <button
        onClick={onSelect}
        className="btn-card-icon info"
        title="More Info"
      >
        <Info size={16} />
      </button>
    </div>
  );
};
