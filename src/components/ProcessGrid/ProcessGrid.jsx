import { useState } from 'react';
import ProcessCard from '../ProcessCard/ProcessCard';
import ProcessTable from '../ProcessTable/ProcessTable';
import ControlsBar from '../ControlsBar/ControlsBar';
import './ProcessGrid.css';

const ProcessGrid = ({ processes, activeFilter, onClearFilter, onProcessClick, onToggleLink }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(processes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProcesses = processes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector('.process-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTabChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`process-grid__page-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <section className="process-grid">
      <div className="process-grid__container">
        <div className="process-grid__header">
          <div className="process-grid__title-wrapper">
            <h2 className="process-grid__title">Business processes</h2>
            <button className="process-grid__info-icon" aria-label="More information">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7V11M8 5V5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {activeFilter && (
              <span className="process-grid__filter-badge">
                Filtered by: {activeFilter}
                <button
                  className="process-grid__filter-clear"
                  onClick={onClearFilter}
                  aria-label="Clear filter"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </span>
            )}
          </div>
          <div className="process-grid__view-switcher">
            <button
              className={`process-grid__view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleTabChange('grid')}
              aria-label="Card view"
              title="Card view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            <button
              className={`process-grid__view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => handleTabChange('table')}
              aria-label="Table view"
              title="Table view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <ControlsBar />

        {processes.length === 0 ? (
          <div className="process-grid__empty">
            <p>No processes found for the selected category.</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <ProcessTable
                processes={currentProcesses}
                onProcessClick={onProcessClick}
                onToggleLink={onToggleLink}
              />
            ) : (
              <div className="process-grid__cards">
                {currentProcesses.map((process) => (
                  <ProcessCard
                    key={process.id}
                    id={process.id}
                    title={process.title}
                    profileStatus={process.profileStatus}
                    ownerAvatar={process.ownerAvatar}
                    category={process.category}
                    submissionType={process.submissionType}
                    lastUpdatedAt={process.lastUpdatedAt}
                    linkedToMap={process.linkedToMap}
                    onToggleLink={onToggleLink}
                    onClick={() => onProcessClick(process)}
                  />
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="process-grid__pagination">
                <button
                  className="process-grid__page-arrow"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {renderPageNumbers()}
                <button
                  className="process-grid__page-arrow"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProcessGrid;
