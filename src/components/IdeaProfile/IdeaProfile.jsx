import React from 'react';
import './IdeaProfile.css';

const statusColors = {
  Backlog:        { bg: '#F4F5F7', text: '#5E6C84' },
  'Under review': { bg: '#DEEBFF', text: '#0052CC' },
  Approved:       { bg: '#E3FCEF', text: '#006644' },
  Rejected:       { bg: '#FFEBE6', text: '#BF2600' },
};

const typeColors = {
  'Idea':             { bg: '#EAE6FF', text: '#403294' },
  'Change Request':   { bg: '#FFF0B3', text: '#7A5C00' },
  'Business Process': { bg: '#E3FCEF', text: '#006644' },
};

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDaysAgo = (iso) => {
  if (!iso) return '—';
  const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
};

// ── Activity placeholder ──────────────────────────────────
const ActivityPlaceholder = () => (
  <div className="idea-profile__activity-empty">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke="var(--color-border)" strokeWidth="1.5"/>
      <path d="M10 16h12M16 10v12" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <p>No activity yet</p>
  </div>
);

// ── Detail row ────────────────────────────────────────────
const DetailRow = ({ label, children }) => (
  <div className="idea-profile__detail-row">
    <span className="idea-profile__detail-label">{label}</span>
    <div className="idea-profile__detail-value">{children}</div>
  </div>
);

// ── Main component ────────────────────────────────────────
const IdeaProfile = ({ idea, onClose }) => {
  if (!idea) return null;

  const status = statusColors[idea.status] || statusColors.Backlog;
  const type   = typeColors[idea.submissionType] || typeColors['Idea'];

  return (
    <div className="idea-profile-page">

      {/* ── Sticky header ─────────────────────────────── */}
      <header className="idea-profile__header">
        <div className="idea-profile__header-top">
          <button className="idea-profile__back-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Ideas
          </button>
        </div>

        <div className="idea-profile__header-main">
          <div className="idea-profile__title-row">
            <h1 className="idea-profile__title">{idea.title}</h1>
            <div className="idea-profile__badges">
              <span className="idea-profile__badge" style={{ backgroundColor: status.bg, color: status.text }}>
                {idea.status}
              </span>
              <span className="idea-profile__badge" style={{ backgroundColor: type.bg, color: type.text }}>
                {idea.submissionType}
              </span>
            </div>
          </div>

          <div className="idea-profile__header-actions">
            <button className="idea-profile__action-btn idea-profile__action-btn--secondary">
              Edit
            </button>
            <button className="idea-profile__action-btn idea-profile__action-btn--primary">
              Actions
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="idea-profile__body">

        {/* Main content */}
        <main className="idea-profile__main">

          <section className="idea-profile__section">
            <h2 className="idea-profile__section-title">Description</h2>
            <p className="idea-profile__description">
              {idea.description || 'No description provided.'}
            </p>
          </section>

          {idea.expectedBenefit && (
            <section className="idea-profile__section">
              <h2 className="idea-profile__section-title">Expected benefit</h2>
              <p className="idea-profile__description">{idea.expectedBenefit}</p>
            </section>
          )}

          <section className="idea-profile__section">
            <h2 className="idea-profile__section-title">Activity</h2>
            <ActivityPlaceholder />
          </section>
        </main>

        {/* Sidebar */}
        <aside className="idea-profile__sidebar">
          <section className="idea-profile__section">
            <h2 className="idea-profile__section-title">Details</h2>
            <div className="idea-profile__details">

              <DetailRow label="Status">
                <span className="idea-profile__badge" style={{ backgroundColor: status.bg, color: status.text }}>
                  {idea.status}
                </span>
              </DetailRow>

              <DetailRow label="Type">
                <span className="idea-profile__badge" style={{ backgroundColor: type.bg, color: type.text }}>
                  {idea.submissionType}
                </span>
              </DetailRow>

              {idea.businessArea && (
                <DetailRow label="Business area">
                  <span>{idea.businessArea}</span>
                </DetailRow>
              )}

              {idea.phase && (
                <DetailRow label="Phase">
                  <span>{idea.phase}</span>
                </DetailRow>
              )}

              <DetailRow label="Submitter">
                <div className="idea-profile__submitter">
                  <div className="idea-profile__avatar">{idea.submitterAvatar}</div>
                  <span>{idea.submitter}</span>
                </div>
              </DetailRow>

              {idea.submittedAt && (
                <DetailRow label="Submitted">
                  <span>{formatDate(idea.submittedAt)}</span>
                </DetailRow>
              )}

              {idea.lastUpdatedAt && (
                <DetailRow label="Last updated">
                  <span>{formatDaysAgo(idea.lastUpdatedAt)}</span>
                </DetailRow>
              )}

            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default IdeaProfile;
