import React from 'react';
import './ControlsBar.css';

const ControlsBar = () => {
  return (
    <div className="controls-bar">
      <div className="controls-bar__container">
        <div className="controls-bar__left">
          <div className="controls-bar__search">
            <svg className="controls-bar__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="controls-bar__search-input"
              placeholder="Search"
            />
          </div>
          <div className="controls-bar__actions">
            <div className="controls-bar__select">
              <label className="controls-bar__label">Sort:</label>
              <select className="controls-bar__dropdown">
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
              <svg className="controls-bar__dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button className="controls-bar__filter-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
