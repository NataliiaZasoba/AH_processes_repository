import React, { useState } from 'react';
import './ChangeRequestSubmission.css';

const ChangeRequestSubmission = ({ onSubmit, onBack, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    priority: '',
    affectedProcess: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.owner && formData.priority) {
      onSubmit(formData);
    }
  };

  return (
    <div className="cr-submission">
      <div className="cr-submission__header">
        <button
          className="cr-submission__back-button"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="cr-submission__header-meta">
          <span className="cr-submission__type-badge">Change Request</span>
          <h1 className="cr-submission__title">Submit Change Request</h1>
        </div>
      </div>

      <div className="cr-submission__content">
        <form className="cr-submission__form" onSubmit={handleSubmit}>
          <div className="cr-submission__section">
            <h2 className="cr-submission__section-title">Request Details</h2>

            <div className="cr-submission__field">
              <label className="cr-submission__label" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="cr-submission__input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Describe the change being requested"
                required
              />
            </div>

            <div className="cr-submission__field">
              <label className="cr-submission__label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="cr-submission__textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the change, reason, and expected outcome"
                rows="4"
                required
              />
            </div>

            <div className="cr-submission__field">
              <label className="cr-submission__label" htmlFor="owner">
                Owner *
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                className="cr-submission__input"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Responsible person or team"
                required
              />
            </div>

            <div className="cr-submission__field">
              <label className="cr-submission__label" htmlFor="priority">
                Priority *
              </label>
              <select
                id="priority"
                name="priority"
                className="cr-submission__select"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="cr-submission__field">
              <label className="cr-submission__label" htmlFor="affectedProcess">
                Affected Process
                <span className="cr-submission__label-optional"> (optional)</span>
              </label>
              <input
                type="text"
                id="affectedProcess"
                name="affectedProcess"
                className="cr-submission__input"
                value={formData.affectedProcess}
                onChange={handleChange}
                placeholder="Name of the process being changed"
              />
            </div>
          </div>

          <div className="cr-submission__footer">
            <button
              type="button"
              className="cr-submission__button cr-submission__button--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cr-submission__button cr-submission__button--primary"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeRequestSubmission;
