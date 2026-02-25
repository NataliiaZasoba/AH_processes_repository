import React from 'react';
import './EmptyState.css';

const EmptyState = ({ onConnectMap, onSubmitProcess }) => {
  return (
    <div className="empty-state">
      <div className="empty-state__container">
        <div className="empty-state__icon">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="50" fill="#F0F4F8" stroke="#E1E8ED" strokeWidth="2"/>
            <path d="M40 50H80M40 60H80M40 70H65" stroke="#9AA5B1" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="85" cy="70" r="8" fill="#0066FF"/>
            <path d="M85 66V74M81 70H89" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 className="empty-state__title">Get Started with Process Repository</h2>
        <p className="empty-state__description">
          Start building your process repository by connecting a capability map or submitting your first process.
          Organize and track your business processes in one central location.
        </p>

        <div className="empty-state__actions">
          <button
            className="empty-state__action-card"
            onClick={onConnectMap}
          >
            <div className="empty-state__action-icon empty-state__action-icon--primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 12H24M8 16H24M8 20H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="empty-state__action-content">
              <h3 className="empty-state__action-title">Connect Capability Map</h3>
              <p className="empty-state__action-description">
                Link your Draw.io capability map to visualize process categories and relationships
              </p>
            </div>
            <svg className="empty-state__action-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="empty-state__action-card"
            onClick={onSubmitProcess}
          >
            <div className="empty-state__action-icon empty-state__action-icon--secondary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 8V24M8 16H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="empty-state__action-content">
              <h3 className="empty-state__action-title">Submit New Process</h3>
              <p className="empty-state__action-description">
                Add your first business process to start building your repository
              </p>
            </div>
            <svg className="empty-state__action-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="empty-state__help">
          <p className="empty-state__help-text">
            Need help getting started? Learn more about organizing your automation processes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
