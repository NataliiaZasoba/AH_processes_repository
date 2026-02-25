import React from 'react';
import './ProcessTable.css';

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.5 11.5l-1 1a2 2 0 01-2.83-2.83l3-3A2 2 0 016.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11.5 4.5l1-1a2 2 0 012.83 2.83l-3 3A2 2 0 019.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const UnlinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4.5 11.5l-1 1a2 2 0 01-2.83-2.83l3-3A2 2 0 016.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11.5 4.5l1-1a2 2 0 012.83 2.83l-3 3A2 2 0 019.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 13L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SortIcon = () => (
  <svg className="process-table__sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2L9 5H3L6 2Z" fill="currentColor"/>
    <path d="M6 10L3 7H9L6 10Z" fill="currentColor"/>
  </svg>
);

const ProcessTable = ({ processes, onProcessClick, onToggleLink }) => {
  const getAutomationLevel = (status) => {
    if (!status) return 'Not Started';
    const match = status.match(/(\d+)\s+Automated/);
    if (!match) return 'Not Started';
    const count = parseInt(match[1]);
    if (count === 0) return 'Not Started';
    if (count < 50) return 'In Progress';
    return 'Automated';
  };

  const getAutomationClass = (status) => {
    const level = getAutomationLevel(status);
    return level.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="process-table">
      <table className="process-table__table">
        <thead className="process-table__thead">
          <tr>
            <th className="process-table__th"><span className="process-table__th-inner">Process Name <SortIcon /></span></th>
            <th className="process-table__th"><span className="process-table__th-inner">Description <SortIcon /></span></th>
            <th className="process-table__th"><span className="process-table__th-inner">Owner <SortIcon /></span></th>
            <th className="process-table__th"><span className="process-table__th-inner">Category <SortIcon /></span></th>
            <th className="process-table__th"><span className="process-table__th-inner">Status <SortIcon /></span></th>
            <th className="process-table__th process-table__th--map">Map</th>
          </tr>
        </thead>
        <tbody className="process-table__tbody">
          {processes.map((process) => (
            <tr
              key={process.id}
              className="process-table__tr"
              onClick={() => onProcessClick(process)}
            >
              <td className="process-table__td process-table__td--name">
                <div className="process-table__name-wrapper">
                  <span className="process-table__title">{process.title}</span>
                </div>
              </td>
              <td className="process-table__td process-table__td--description">
                <span className="process-table__description">{process.description}</span>
              </td>
              <td className="process-table__td">
                <div className="process-table__owner">
                  <div className="process-table__avatar">{process.ownerAvatar}</div>
                  <span className="process-table__owner-name">{process.owner}</span>
                </div>
              </td>
              <td className="process-table__td">
                {process.category}
              </td>
              <td className="process-table__td">
                <span className={`process-table__status process-table__status--${getAutomationClass(process.status)}`}>
                  {getAutomationLevel(process.status)}
                </span>
              </td>
              <td className="process-table__td process-table__td--map">
                {onToggleLink && (
                  <button
                    className={`process-table__link-button ${process.linkedToMap ? 'linked' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleLink(process.id); }}
                    title={process.linkedToMap ? 'Unlink from Capability Map' : 'Link to Capability Map'}
                    aria-label={process.linkedToMap ? 'Unlink from Capability Map' : 'Link to Capability Map'}
                  >
                    {process.linkedToMap ? <UnlinkIcon /> : <LinkIcon />}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
