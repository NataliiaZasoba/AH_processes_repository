import React, { useState, useMemo } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './IdeasPage.css';

const IDEAS_BREADCRUMB = [
  { label: 'Automation hub', href: '#home' },
  { label: 'Ideas' },
];

const CURRENT_USER = 'Natalia Zancu';

const pipelineItems = ['Backlog', 'Under review', 'Approved', 'Rejected'];
const savedViewItems = ['High-impact ideas', 'Q1 shortlist'];

const categoryTree = [
  { name: 'Finance & Accounting', children: ['Accounts Payable', 'Accounts Receivable', 'Payroll', 'Tax & Compliance', 'Budgeting'] },
  { name: 'Human Resources', children: ['Recruiting', 'Onboarding', 'Benefits', 'Performance Management', 'Training'] },
  { name: 'Marketing & Sales', children: ['Lead Generation', 'Campaign Management', 'Customer Acquisition', 'Analytics'] },
  { name: 'Service Delivery', children: ['Operations', 'Quality Assurance', 'Logistics', 'Project Management'] },
  { name: 'Customer Support', children: ['Ticket Management', 'Knowledge Base', 'Escalations', 'Customer Success'] },
  { name: 'Product & Development', children: ['Product Planning', 'Engineering', 'QA & Testing', 'Release Management'] },
];

const statusColors = {
  Backlog: { bg: '#F4F5F7', text: '#5E6C84' },
  'Under review': { bg: '#DEEBFF', text: '#0052CC' },
  Approved: { bg: '#E3FCEF', text: '#006644' },
  Rejected: { bg: '#FFEBE6', text: '#BF2600' },
};

const formatDaysAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1d ago';
  return `${diff}d ago`;
};

const submissionTypeColors = {
  'Idea':             { bg: '#EAE6FF', text: '#403294' },
  'Change Request':   { bg: '#FFF0B3', text: '#7A5C00' },
  'Business Process': { bg: '#E3FCEF', text: '#006644' },
};

// ── Chevron ──────────────────────────────────────────────
const ChevronIcon = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    className={`ideas-sidebar__chevron ${open ? 'ideas-sidebar__chevron--open' : ''}`}
  >
    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Accordion section ─────────────────────────────────────
const AccordionSection = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ideas-sidebar__section">
      <button className="ideas-sidebar__section-header" onClick={() => setOpen(o => !o)}>
        <span className="ideas-sidebar__section-title">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="ideas-sidebar__section-body">{children}</div>}
    </div>
  );
};

// ── Idea card ─────────────────────────────────────────────
const IdeaCard = ({ idea, onIdeaClick }) => {
  const status = statusColors[idea.status] || statusColors.Backlog;
  return (
    <div className="idea-card" onClick={() => onIdeaClick && onIdeaClick(idea)}>
      {/* Header row: status chip only */}
      <div className="idea-card__header">
        <span className="idea-card__status" style={{ backgroundColor: status.bg, color: status.text }}>
          {idea.status}
        </span>
      </div>

      {/* Name */}
      <h3 className="idea-card__title">{idea.title}</h3>

      {/* Meta: Business area only */}
      <div className="idea-card__meta">
        <span className="idea-card__meta-item">{idea.businessArea}</span>
      </div>

      {/* Footer: avatar + date + submission type + 3-dots */}
      <div className="idea-card__footer">
        <div className="idea-card__avatar">{idea.submitterAvatar}</div>
        <span className="idea-card__date">{formatDaysAgo(idea.lastUpdatedAt)}</span>
        <span className="idea-card__subtype idea-card__subtype--footer">{idea.submissionType}</span>
        <button className="idea-card__menu-button" aria-label="More options" onClick={e => e.stopPropagation()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
            <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
            <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Sort icon ─────────────────────────────────────────────
const SortIcon = () => (
  <svg className="idea-table__sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2L9 5H3L6 2Z" fill="currentColor"/>
    <path d="M6 10L3 7H9L6 10Z" fill="currentColor"/>
  </svg>
);

// ── Idea table ────────────────────────────────────────────
const IdeaTable = ({ ideas, onIdeaClick }) => (
  <div className="idea-table-wrapper">
    <table className="idea-table">
      <thead>
        <tr>
          <th className="idea-table__th"><span className="idea-table__th-inner">Name <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Business area <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Phase <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Status <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Submitter <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Type <SortIcon /></span></th>
          <th className="idea-table__th"><span className="idea-table__th-inner">Updated <SortIcon /></span></th>
          <th className="idea-table__th"></th>
        </tr>
      </thead>
      <tbody>
        {ideas.map(idea => {
          const s = statusColors[idea.status] || statusColors.Backlog;
          const t = submissionTypeColors[idea.submissionType] || submissionTypeColors['Idea'];
          return (
            <tr key={idea.id} className="idea-table__row" onClick={() => onIdeaClick && onIdeaClick(idea)}>
              <td className="idea-table__td idea-table__td--title">{idea.title}</td>
              <td className="idea-table__td idea-table__td--secondary">{idea.businessArea}</td>
              <td className="idea-table__td idea-table__td--secondary">{idea.phase}</td>
              <td className="idea-table__td">
                <span className="idea-card__status" style={{ backgroundColor: s.bg, color: s.text }}>
                  {idea.status}
                </span>
              </td>
              <td className="idea-table__td">
                <div className="idea-table__submitter">
                  <div className="idea-card__avatar idea-card__avatar--sm">{idea.submitterAvatar}</div>
                  {idea.submitter}
                </div>
              </td>
              <td className="idea-table__td">
                <span className="idea-card__status" style={{ backgroundColor: t.bg, color: t.text }}>
                  {idea.submissionType}
                </span>
              </td>
              <td className="idea-table__td idea-table__td--date">{formatDaysAgo(idea.lastUpdatedAt)}</td>
              <td className="idea-table__td idea-table__td--actions">
                <button className="idea-card__menu-button" aria-label="More options">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
                    <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ── Main component ────────────────────────────────────────
const IdeasPage = ({ ideas = [], onSubmitIdea, onIdeaClick }) => {
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('All ideas');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const toggleCategory = (name) =>
    setExpandedCategories(prev => ({ ...prev, [name]: !prev[name] }));

  const handleSetActiveItem = (item) => { setActiveItem(item); setCurrentPage(1); };
  const handleSetSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleSetViewMode = (mode) => { setViewMode(mode); setCurrentPage(1); };

  const myIdeasCount = ideas.filter(i => i.submitter === CURRENT_USER).length;

  const generalItems = [
    { label: 'All ideas', count: ideas.length },
    { label: 'My collaborations', count: 0 },
    { label: 'My ideas', count: myIdeasCount },
    { label: 'My components', count: 0 },
    { label: 'Following', count: 0 },
  ];

  const visibleIdeas = useMemo(() => {
    let list = ideas;
    if (activeItem === 'My ideas') list = list.filter(i => i.submitter === CURRENT_USER);
    if (pipelineItems.includes(activeItem)) list = list.filter(i => i.status === activeItem);
    if (search.trim()) list = list.filter(i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [ideas, activeItem, search]);

  const totalPages = Math.ceil(visibleIdeas.length / ITEMS_PER_PAGE);
  const pagedIdeas = visibleIdeas.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const isEmpty = activeItem === 'All ideas' && ideas.length === 0;

  return (
    <div className="ideas-page">
      {/* ── Sidebar ───────────────────────────────────── */}
      <aside className={`ideas-page__sidebar${sidebarCollapsed ? ' ideas-page__sidebar--collapsed' : ''}`}>
        {/* Toggle button */}
        <div className="ideas-sidebar__toggle-row">
          <button
            className="ideas-sidebar__toggle-btn"
            onClick={() => setSidebarCollapsed(c => !c)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {sidebarCollapsed
                ? <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>
        </div>

        {/* Collapsible body */}
        {!sidebarCollapsed && (
          <>
            <div className="ideas-sidebar__search">
              <svg className="ideas-sidebar__search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className="ideas-sidebar__search-input"
                placeholder="Search"
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
              />
            </div>

            <AccordionSection title="General" defaultOpen>
              {generalItems.map(({ label, count }) => (
                <button
                  key={label}
                  className={`ideas-sidebar__item ${activeItem === label ? 'ideas-sidebar__item--active' : ''}`}
                  onClick={() => handleSetActiveItem(label)}
                >
                  <span className="ideas-sidebar__item-label">{label}</span>
                  {count > 0 && <span className="ideas-sidebar__count">{count}</span>}
                </button>
              ))}
            </AccordionSection>

            <AccordionSection title="Pipeline" defaultOpen>
              {pipelineItems.map(item => {
                const count = ideas.filter(i => i.status === item).length;
                return (
                  <button
                    key={item}
                    className={`ideas-sidebar__item ${activeItem === item ? 'ideas-sidebar__item--active' : ''}`}
                    onClick={() => handleSetActiveItem(item)}
                  >
                    <span className="ideas-sidebar__item-label">{item}</span>
                    {count > 0 && <span className="ideas-sidebar__count">{count}</span>}
                  </button>
                );
              })}
            </AccordionSection>

            <AccordionSection title="My saved views and filters">
              {savedViewItems.map(item => (
                <button
                  key={item}
                  className={`ideas-sidebar__item ${activeItem === item ? 'ideas-sidebar__item--active' : ''}`}
                  onClick={() => handleSetActiveItem(item)}
                >
                  <span className="ideas-sidebar__item-label">{item}</span>
                </button>
              ))}
            </AccordionSection>

            <div className="ideas-sidebar__divider" />

            <AccordionSection title="Categories">
            <div className="ideas-sidebar__categories">
              {categoryTree.map(cat => (
                <div key={cat.name} className="ideas-sidebar__category">
                  <button
                    className="ideas-sidebar__category-header"
                    onClick={() => toggleCategory(cat.name)}
                  >
                    <ChevronIcon open={!!expandedCategories[cat.name]} />
                    <span>{cat.name}</span>
                  </button>
                  {expandedCategories[cat.name] && (
                    <div className="ideas-sidebar__category-children">
                      {cat.children.map(child => (
                        <button
                          key={child}
                          className={`ideas-sidebar__item ideas-sidebar__item--child ${activeItem === child ? 'ideas-sidebar__item--active' : ''}`}
                          onClick={() => handleSetActiveItem(child)}
                        >
                          <span className="ideas-sidebar__item-label">{child}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </AccordionSection>
          </>
        )}
      </aside>

      {/* ── Content ───────────────────────────────────── */}
      <main className="ideas-page__content">
        <Breadcrumb items={IDEAS_BREADCRUMB} />
        <div className="ideas-page__content-body">
        <div className="ideas-page__content-header">
          <h1 className="ideas-page__content-title">{activeItem}</h1>
        </div>

        {isEmpty ? (
          <div className="ideas-page__empty">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="22" r="12" stroke="#BDBDBD" strokeWidth="2"/>
              <path d="M22 22c0-3.314 2.686-6 6-6" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="28" cy="22" r="2" fill="#BDBDBD"/>
              <path d="M14 46c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="ideas-page__empty-title">No ideas yet</p>
            <p className="ideas-page__empty-desc">Be the first to submit an idea and drive automation forward.</p>
            <button className="ideas-page__cta-button" onClick={onSubmitIdea}>
              Submit an idea
            </button>
          </div>
        ) : (
          <>
            {/* Controls bar */}
            <div className="ideas-controls">
              <div className="ideas-controls__left">
                <div className="ideas-controls__search">
                  <svg className="ideas-controls__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    className="ideas-controls__search-input"
                    placeholder="Search"
                    value={search}
                    onChange={e => handleSetSearch(e.target.value)}
                  />
                </div>
                <div className="ideas-controls__select">
                  <label className="ideas-controls__label">Sort:</label>
                  <div className="ideas-controls__dropdown-wrapper">
                    <select className="ideas-controls__dropdown">
                      <option value="recent">Recent</option>
                      <option value="title">Title</option>
                      <option value="status">Status</option>
                    </select>
                    <svg className="ideas-controls__dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <button className="ideas-controls__action-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Filter</span>
                </button>
                <button className="ideas-controls__action-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 3h12M2 8h8M2 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13 10v6M10 13l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Columns</span>
                </button>
              </div>
              <div className="ideas-controls__view-switcher">
                <button
                  className={`ideas-controls__view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => handleSetViewMode('grid')}
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
                  className={`ideas-controls__view-button ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => handleSetViewMode('table')}
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

            {/* Ideas list */}
            {visibleIdeas.length === 0 ? (
              <div className="ideas-page__empty ideas-page__empty--inline">
                <p className="ideas-page__empty-title">No ideas match your search.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="ideas-grid">
                {pagedIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} onIdeaClick={onIdeaClick} />)}
              </div>
            ) : (
              <IdeaTable ideas={pagedIdeas} onIdeaClick={onIdeaClick} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="ideas-pagination">
                <button
                  className="ideas-pagination__arrow"
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`ideas-pagination__page${currentPage === page ? ' active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="ideas-pagination__arrow"
                  onClick={() => setCurrentPage(p => p + 1)}
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
      </main>
    </div>
  );
};

export default IdeasPage;
