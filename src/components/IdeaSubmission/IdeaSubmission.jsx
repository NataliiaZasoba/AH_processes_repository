import React, { useState } from 'react';
import './IdeaSubmission.css';

const IdeaSubmission = ({ onSubmit, onBack, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submitter: '',
    expectedBenefit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.submitter) {
      onSubmit(formData);
    }
  };

  return (
    <div className="idea-submission">
      <div className="idea-submission__header">
        <button
          className="idea-submission__back-button"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="idea-submission__header-meta">
          <span className="idea-submission__type-badge">Idea</span>
          <h1 className="idea-submission__title">Submit New Idea</h1>
        </div>
      </div>

      <div className="idea-submission__content">
        <form className="idea-submission__form" onSubmit={handleSubmit}>
          <div className="idea-submission__section">
            <h2 className="idea-submission__section-title">Idea Details</h2>

            <div className="idea-submission__field">
              <label className="idea-submission__label" htmlFor="title">
                Idea Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="idea-submission__input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your idea a clear, descriptive title"
                required
              />
            </div>

            <div className="idea-submission__field">
              <label className="idea-submission__label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="idea-submission__textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your idea in detail"
                rows="4"
                required
              />
            </div>

            <div className="idea-submission__field">
              <label className="idea-submission__label" htmlFor="submitter">
                Submitter *
              </label>
              <input
                type="text"
                id="submitter"
                name="submitter"
                className="idea-submission__input"
                value={formData.submitter}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="idea-submission__field">
              <label className="idea-submission__label" htmlFor="expectedBenefit">
                Expected Benefit
                <span className="idea-submission__label-optional"> (optional)</span>
              </label>
              <textarea
                id="expectedBenefit"
                name="expectedBenefit"
                className="idea-submission__textarea"
                value={formData.expectedBenefit}
                onChange={handleChange}
                placeholder="Describe the expected business value or benefit"
                rows="3"
              />
            </div>
          </div>

          <div className="idea-submission__footer">
            <button
              type="button"
              className="idea-submission__button idea-submission__button--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="idea-submission__button idea-submission__button--primary"
            >
              Submit Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaSubmission;
