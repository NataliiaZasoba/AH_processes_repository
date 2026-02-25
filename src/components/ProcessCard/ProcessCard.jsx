import React, { useState, useRef, useEffect } from 'react';
import './ProcessCard.css';

const profileStatusColors = {
  'Active':         { bg: '#E3FCEF', text: '#006644' },
  'Under review':   { bg: '#DEEBFF', text: '#0052CC' },
  'In Development': { bg: '#FFF0B3', text: '#7A5C00' },
  'Backlog':        { bg: '#F4F5F7', text: '#5E6C84' },
  'Retired':        { bg: '#FFEBE6', text: '#BF2600' },
};

const formatDaysAgo = (iso) => {
  if (!iso) return 'Today';
  const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diff <= 0) return 'Today';
  if (diff === 1) return '1d ago';
  return `${diff}d ago`;
};

const ProcessCard = ({
  id,
  title,
  profileStatus,
  ownerAvatar,
  category,
  submissionType,
  lastUpdatedAt,
  linkedToMap,
  onToggleLink,
  onClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const displayStatus = profileStatus || 'Backlog';
  const statusStyle = profileStatusColors[displayStatus];

  return (
    <div className="process-card" onClick={onClick}>

      {/* Header: profile status badge */}
      <div className="process-card__header">
        <span className="process-card__status" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
          {displayStatus}
        </span>
      </div>

      {/* Title */}
      <h3 className="process-card__title">{title}</h3>

      {/* Category (business area) */}
      {category && (
        <div className="process-card__meta">
          <span className="process-card__meta-item">{category}</span>
        </div>
      )}

      {/* Footer: avatar + date + submission type + 3-dots menu */}
      <div className="process-card__footer">
        <div className="process-card__avatar">{ownerAvatar}</div>
        <span className="process-card__date">{formatDaysAgo(lastUpdatedAt)}</span>
        {submissionType && (
          <span className="process-card__subtype process-card__subtype--footer">{submissionType}</span>
        )}
        <div className="process-card__menu-wrapper" ref={menuRef}>
          <button
            className="process-card__menu-button"
            aria-label="More options"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
            </svg>
          </button>
          {menuOpen && onToggleLink && (
            <div className="process-card__menu-dropdown">
              <button
                className="process-card__menu-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLink(id);
                  setMenuOpen(false);
                }}
              >
                {linkedToMap ? 'Unlink from capability map' : 'Link to capability map'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
