import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './Header.css';

const Header = ({ onSubmitClick, onNavigate, currentPage }) => {
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dashboardsRef = useRef(null);
  const exploreRef = useRef(null);

  const toggleDashboards = (e) => {
    e.preventDefault();
    setIsDashboardsOpen(!isDashboardsOpen);
  };

  const toggleExplore = (e) => {
    e.preventDefault();
    setIsExploreOpen(!isExploreOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dashboardsRef.current && !dashboardsRef.current.contains(event.target)) {
        setIsDashboardsOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    };

    if (isDashboardsOpen || isExploreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDashboardsOpen, isExploreOpen]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <span className="header__logo-icon">⚏</span>
            <span className="header__logo-text">UiPath Automation Hub</span>
          </div>
          <nav className="header__nav">
            <a
              href="#ideas"
              className={`header__nav-item ${currentPage === 'ideas' ? 'header__nav-item--active' : ''}`}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('ideas'); }}
            >Ideas</a>
            <div className="header__nav-dropdown" ref={exploreRef}>
              <a
                href="#explore"
                className={`header__nav-item header__nav-item--has-dropdown ${currentPage === 'explore' ? 'header__nav-item--active' : ''}`}
                onClick={toggleExplore}
              >
                Explore
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="header__nav-dropdown-icon">
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {isExploreOpen && (
                <div className="header__nav-submenu">
                  <a
                    href="#processes-repository"
                    className={`header__nav-submenu-item ${currentPage === 'explore' ? 'header__nav-submenu-item--active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('explore'); setIsExploreOpen(false); }}
                  >Processes repository</a>
                  <a href="#components" className="header__nav-submenu-item">Components</a>
                  <a href="#people" className="header__nav-submenu-item">People</a>
                  <a href="#leaderboard" className="header__nav-submenu-item">Leaderboard</a>
                </div>
              )}
            </div>
            <div className="header__nav-dropdown" ref={dashboardsRef}>
              <a
                href="#dashboards"
                className="header__nav-item header__nav-item--has-dropdown"
                onClick={toggleDashboards}
              >
                Dashboards
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="header__nav-dropdown-icon">
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {isDashboardsOpen && (
                <div className="header__nav-submenu">
                  <a href="#mockups" className="header__nav-submenu-item">Mockups</a>
                  <a href="#figma" className="header__nav-submenu-item">Figma</a>
                </div>
              )}
            </div>
            <a href="#admin" className="header__nav-item">Admin console</a>
          </nav>
        </div>
        <div className="header__right">
          <Button variant="primary" size="small" onClick={onSubmitClick}>Submit new</Button>
          <button className="header__icon-button" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 12L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="header__icon-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.8 2 6 3.8 6 6V10L4 12V14H16V12L14 10V6C14 3.8 12.2 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 14V15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="header__icon-button" aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 14V14.01M10 11C10 9.9 10.9 9 12 9C13.1 9 14 8.1 14 7C14 5.9 13.1 5 12 5H10C8.9 5 8 5.9 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="header__profile-button" aria-label="Profile">
            <div className="header__avatar">NZ</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
