import React, { useState } from 'react';
import './ProcessSubmission.css';

const ProcessSubmission = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    category: '',
    status: '0 Automated',
    linkToMap: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleLink = () => {
    setFormData(prev => ({ ...prev, linkToMap: !prev.linkToMap }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.owner && formData.category) {
      onSubmit(formData);
    }
  };

  return (
    <div className="process-submission">
      <div className="process-submission__header">
        <button
          className="process-submission__back-button"
          onClick={onCancel}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <h1 className="process-submission__title">Submit New Process</h1>
      </div>

      <div className="process-submission__content">
        <form className="process-submission__form" onSubmit={handleSubmit}>
          <div className="process-submission__section">
            <h2 className="process-submission__section-title">Process Information</h2>

            <div className="process-submission__field">
              <label className="process-submission__label" htmlFor="title">
                Process Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="process-submission__input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter process title"
                required
              />
            </div>

            <div className="process-submission__field">
              <label className="process-submission__label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="process-submission__textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the process"
                rows="4"
                required
              />
            </div>

            <div className="process-submission__field">
              <label className="process-submission__label" htmlFor="owner">
                Process Owner *
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                className="process-submission__input"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />
            </div>

            <div className="process-submission__field">
              <label className="process-submission__label" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className="process-submission__select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
                <option value="Service Delivery">Service Delivery</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Product & Development">Product & Development</option>
                <option value="Project: Purchase order">Project: Purchase order</option>
              </select>
            </div>

            <div className="process-submission__field process-submission__field--toggle">
              <button
                type="button"
                className="process-submission__toggle-row"
                onClick={handleToggleLink}
                aria-pressed={formData.linkToMap}
              >
                <div className="process-submission__toggle-info">
                  <span className="process-submission__label">Link to Capability Map</span>
                  <span className="process-submission__toggle-desc">
                    Display this process in the capability map
                  </span>
                </div>
                <div className={`process-submission__toggle ${formData.linkToMap ? 'active' : ''}`}>
                  <span className="process-submission__toggle-thumb" />
                </div>
              </button>
            </div>
          </div>

          <div className="process-submission__footer">
            <button
              type="button"
              className="process-submission__button process-submission__button--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="process-submission__button process-submission__button--primary"
            >
              Submit Process
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessSubmission;
