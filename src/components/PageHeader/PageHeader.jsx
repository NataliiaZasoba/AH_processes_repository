import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, actionText, onActionClick, isActionDisabled }) => {
  return (
    <div className="page-header">
      <div className="page-header__container">
        <div className="page-header__title-wrapper">
          <h1 className="page-header__title">{title}</h1>
          <button className="page-header__info-icon" aria-label="More information">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 7V11M8 5V5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {actionText && (
          <button
            className="page-header__action"
            onClick={onActionClick}
            disabled={isActionDisabled}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
