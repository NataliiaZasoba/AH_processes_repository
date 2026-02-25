import React from 'react';
import './SubmissionTypeSelector.css';

const types = [
  {
    id: 'idea',
    title: 'Idea',
    description: 'Submit a new idea or improvement suggestion for a business process or workflow.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4a9 9 0 0 1 6 15.7V22a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2.3A9 9 0 0 1 16 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 26h8M13 29h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 10v4M14 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    iconClass: 'idea',
  },
  {
    id: 'change-request',
    title: 'Change request',
    description: 'Request a change to an existing process, system, or workflow configuration.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 16a10 10 0 0 1 18-6.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M26 16a10 10 0 0 1-18 6.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 6l2 3.7-3.7 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 26l-2-3.7 3.7-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconClass: 'change-request',
  },
  {
    id: 'business-process',
    title: 'Business process',
    description: 'Define and submit a new business process for automation review and implementation.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="18" y="8" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="11" y="20" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 15v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    iconClass: 'business-process',
  },
];

const SubmissionTypeSelector = ({ onSelectType, onCancel }) => {
  return (
    <div className="type-selector">
      <div className="type-selector__header">
        <button
          className="type-selector__back-button"
          onClick={onCancel}
          aria-label="Cancel"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <h1 className="type-selector__title">Submit New</h1>
      </div>

      <div className="type-selector__content">
        <p className="type-selector__subtitle">Select the type of item you want to create</p>
        <div className="type-selector__cards">
          {types.map((type) => (
            <button
              key={type.id}
              className="type-selector__card"
              onClick={() => onSelectType(type.id)}
            >
              <div className={`type-selector__card-icon type-selector__card-icon--${type.iconClass}`}>
                {type.icon}
              </div>
              <div className="type-selector__card-content">
                <h2 className="type-selector__card-title">{type.title}</h2>
                <p className="type-selector__card-description">{type.description}</p>
              </div>
              <div className="type-selector__card-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionTypeSelector;
