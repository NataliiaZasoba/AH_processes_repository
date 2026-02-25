import React, { useState, useEffect, useRef } from 'react';
import './CapabilityMap.css';

const CapabilityMap = ({ processes = [], onFilterChange, onUnlink, onToggleLink }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isFullscreenLegendOpen, setIsFullscreenLegendOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [contextMenu, setContextMenu] = useState(null); // { processId, x, y }
  const menuRef = useRef(null);
  const legendRef = useRef(null);
  const fullscreenLegendRef = useRef(null);
  const contextMenuRef = useRef(null);

  const processColors = {
    automated: '#55AD8A',
    semiAutomated: '#5E89CD',
    inProgress: '#FBAD35',
    manual: '#818886',
  };

  const wrapText = (text, maxChars) => {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > maxChars && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const getProcessColor = (status) => {
    if (!status) return processColors.manual;
    const match = status.match(/(\d+)\s*Automated/);
    if (!match) return processColors.manual;
    const count = parseInt(match[1]);
    if (count === 0) return processColors.inProgress;
    if (count < 5) return processColors.semiAutomated;
    return processColors.automated;
  };

  const handleSectionClick = (category) => {
    if (expandedSection === category) {
      setExpandedSection(null);
      onFilterChange(null);
    } else {
      setExpandedSection(category);
      onFilterChange(category);
    }
  };

  const handleBackToOverview = () => {
    setExpandedSection(null);
    onFilterChange(null);
  };

  const handleMaximize = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleLegend = () => setIsLegendOpen(prev => !prev);

  const handleEdit = () => {
    setIsMenuOpen(false);
    console.log('Edit Capability map');
  };

  const handleUnlinkMap = () => {
    setIsMenuOpen(false);
    if (onUnlink) onUnlink();
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
      if (legendRef.current && !legendRef.current.contains(event.target)) setIsLegendOpen(false);
      if (fullscreenLegendRef.current && !fullscreenLegendRef.current.contains(event.target)) setIsFullscreenLegendOpen(false);
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) setContextMenu(null);
    };
    if (isMenuOpen || isLegendOpen || isFullscreenLegendOpen || contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isLegendOpen, isFullscreenLegendOpen, contextMenu]);

  const renderProcessDiagram = () => {
    const linkedProcesses = processes.filter(p => p.linkedToMap);

    if (linkedProcesses.length === 0) {
      return (
        <div className="capability-map__no-processes">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="16" width="32" height="22" rx="4" stroke="#BDBDBD" strokeWidth="2"/>
            <path d="M17 16V11a7 7 0 0114 0v5" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="capability-map__no-processes-title">No processes linked</p>
          <p className="capability-map__no-processes-desc">
            Use the link icon on process cards or table rows to add processes here.
          </p>
        </div>
      );
    }

    // Group by category
    const categoryGroups = {};
    linkedProcesses.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(p);
    });

    const swimlanes = Object.entries(categoryGroups);
    const maxProcesses = Math.max(...swimlanes.map(([, procs]) => procs.length));

    const LANE_HEIGHT = 90;
    const BOX_WIDTH = 130;
    const BOX_HEIGHT = 50;
    const BOX_GAP = 18;
    const LABEL_WIDTH = 110;
    const BOX_Y_OFFSET = (LANE_HEIGHT - BOX_HEIGHT) / 2;
    const START_X = LABEL_WIDTH + 12;

    const svgWidth = Math.max(
      START_X + maxProcesses * (BOX_WIDTH + BOX_GAP) - BOX_GAP + 20,
      700
    );
    const svgHeight = swimlanes.length * LANE_HEIGHT;

    return (
      <svg
        className="capability-map__svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        style={{ display: 'block' }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#818886" />
          </marker>
        </defs>

        {swimlanes.map(([category, procs], laneIdx) => {
          const laneY = laneIdx * LANE_HEIGHT;
          const isActive = expandedSection === category;
          const isDimmed = expandedSection && !isActive;

          return (
            <g key={category} style={{ opacity: isDimmed ? 0.3 : 1 }}>
              {/* Lane background */}
              <rect
                x="0" y={laneY} width={svgWidth} height={LANE_HEIGHT}
                fill={laneIdx % 2 === 0 ? '#FAFBFC' : '#FFFFFF'}
                stroke="#E0E0E0" strokeWidth="1"
              />
              {/* Lane label */}
              <rect
                x="0" y={laneY} width={LABEL_WIDTH} height={LANE_HEIGHT}
                fill="#F4F5F7" stroke="#E0E0E0" strokeWidth="1"
              />
              {(() => {
                const lines = wrapText(category, 12);
                const lineHeight = 16;
                const centerY = laneY + LANE_HEIGHT / 2;
                return (
                  <text
                    textAnchor="start"
                    fontSize="12"
                    fill="#5E6C84"
                    fontWeight="600"
                  >
                    {lines.map((line, i) => (
                      <tspan
                        key={i}
                        x={12}
                        y={centerY + (i - (lines.length - 1) / 2) * lineHeight}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              })()}

              {/* Process boxes */}
              {procs.map((proc, procIdx) => {
                const boxX = START_X + procIdx * (BOX_WIDTH + BOX_GAP);
                const boxY = laneY + BOX_Y_OFFSET;
                const color = getProcessColor(proc.status);

                const showMenu = hoveredNode === proc.id || contextMenu?.processId === proc.id;
                const dotCx = boxX + BOX_WIDTH - 9;

                return (
                  <g
                    key={proc.id}
                    onMouseEnter={() => setHoveredNode(proc.id)}
                    onMouseLeave={() => { if (!contextMenu) setHoveredNode(null); }}
                  >
                    {/* Arrow to next process */}
                    {procIdx < procs.length - 1 && (
                      <line
                        x1={boxX + BOX_WIDTH} y1={boxY + BOX_HEIGHT / 2}
                        x2={boxX + BOX_WIDTH + BOX_GAP - 2} y2={boxY + BOX_HEIGHT / 2}
                        stroke="#818886" strokeWidth="1.5" markerEnd="url(#arrowhead)"
                      />
                    )}

                    {/* Clickable process box (filters by lane) */}
                    <g
                      className="process-box clickable"
                      onClick={() => handleSectionClick(category)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setContextMenu({ processId: proc.id, x: e.clientX, y: e.clientY });
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect
                        x={boxX} y={boxY} width={BOX_WIDTH} height={BOX_HEIGHT}
                        fill={color}
                        stroke={isActive ? '#003D99' : color}
                        strokeWidth={isActive ? '3' : '1'}
                        rx="4"
                      />
                      <text
                        x={boxX + BOX_WIDTH / 2}
                        y={boxY + BOX_HEIGHT / 2 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="white"
                        fontWeight="600"
                      >
                        {proc.title.length > 14 ? proc.title.slice(0, 14) + '…' : proc.title}
                      </text>
                    </g>

                    {/* 3-dots button — visible on hover */}
                    {showMenu && (
                      <g
                        className="process-box__menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setContextMenu({ processId: proc.id, x: e.clientX, y: e.clientY });
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x={boxX + BOX_WIDTH - 17} y={boxY + 2}
                          width="15" height="15" rx="3"
                          fill="rgba(0,0,0,0.28)"
                        />
                        <circle cx={dotCx} cy={boxY + 5.5} r="1.2" fill="white"/>
                        <circle cx={dotCx} cy={boxY + 9.5} r="1.2" fill="white"/>
                        <circle cx={dotCx} cy={boxY + 13.5} r="1.2" fill="white"/>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <>
      <section className="capability-map">
        <div className="capability-map__container">
          <div className="capability-map__header">
            <div className="capability-map__title-wrapper">
              {expandedSection ? (
                <div className="capability-map__breadcrumb">
                  <button
                    className="capability-map__back-button"
                    onClick={handleBackToOverview}
                    aria-label="Back to overview"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="capability-map__breadcrumb-text">
                    <a
                      href="#overview"
                      onClick={(e) => { e.preventDefault(); handleBackToOverview(); }}
                      className="capability-map__breadcrumb-link"
                    >
                      Capability map
                    </a>
                    <span className="capability-map__breadcrumb-separator">›</span>
                    <span className="capability-map__breadcrumb-current">{expandedSection}</span>
                  </span>
                </div>
              ) : (
                <>
                  <h2 className="capability-map__title">Capability map</h2>
                  <button className="capability-map__info-icon" aria-label="More information">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 7V11M8 5V5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="capability-map__actions">
              <div className="capability-map__legend-wrapper" ref={legendRef}>
                <button
                  className="capability-map__legend-button"
                  aria-label="Show legend"
                  onClick={toggleLegend}
                >
                  Legend
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {isLegendOpen && (
                  <div className="capability-map__legend-dropdown">
                    {[
                      { color: processColors.automated, label: 'Fully Automated' },
                      { color: processColors.semiAutomated, label: 'Semi-Automated' },
                      { color: processColors.inProgress, label: 'In Progress' },
                      { color: processColors.manual, label: 'Not Started' },
                    ].map(({ color, label }) => (
                      <div key={label} className="capability-map__legend-item">
                        <div className="capability-map__legend-color" style={{ backgroundColor: color }} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="capability-map__expand-button" aria-label="Expand to fullscreen" onClick={handleMaximize}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 2H14V6M6 14H2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2L9 7M2 14L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="capability-map__menu-wrapper" ref={menuRef}>
                <button
                  className="capability-map__menu-button"
                  aria-label="More options"
                  onClick={toggleMenu}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="capability-map__dropdown">
                    <button className="capability-map__dropdown-item" onClick={handleEdit}>Edit</button>
                    <button className="capability-map__dropdown-item" onClick={handleUnlinkMap}>Unlink Capability map</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="capability-map__content">
            <div className="capability-map__diagram">
              <div className="capability-map__zoom-controls">
                <button
                  className="capability-map__zoom-button"
                  aria-label="Zoom in"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className="capability-map__zoom-button"
                  aria-label="Zoom out"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div
                className="capability-map__diagram-inner"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.2s ease',
                }}
              >
                {renderProcessDiagram()}
              </div>
            </div>

            <div className="capability-map__footer">
              <span className="capability-map__timestamp">
                Last updated: 2 mins ago, Sun 3 Feb, 3:13 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="capability-map__context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="capability-map__context-item"
            onClick={() => {
              onToggleLink(contextMenu.processId);
              setContextMenu(null);
              setHoveredNode(null);
            }}
          >
            Unlink from capability map
          </button>
        </div>
      )}

      {isFullScreen && (
        <div className="capability-map__fullscreen-modal">
          <div className="capability-map__fullscreen-header">
            <button
              className="capability-map__fullscreen-back"
              onClick={handleCloseFullScreen}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </button>
            <div className="capability-map__fullscreen-title-row">
              <h1 className="capability-map__fullscreen-title">Capability map</h1>
              <div className="capability-map__fullscreen-actions">
                <div className="capability-map__legend-wrapper" ref={fullscreenLegendRef}>
                  <button
                    className="capability-map__legend-button"
                    aria-label="Show legend"
                    onClick={() => setIsFullscreenLegendOpen(prev => !prev)}
                  >
                    Legend
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isFullscreenLegendOpen && (
                    <div className="capability-map__legend-dropdown">
                      {[
                        { color: processColors.automated, label: 'Fully Automated' },
                        { color: processColors.semiAutomated, label: 'Semi-Automated' },
                        { color: processColors.inProgress, label: 'In Progress' },
                        { color: processColors.manual, label: 'Not Started' },
                      ].map(({ color, label }) => (
                        <div key={label} className="capability-map__legend-item">
                          <div className="capability-map__legend-color" style={{ backgroundColor: color }} />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="capability-map__fullscreen-content">
            <div className="capability-map__diagram">
              <div className="capability-map__zoom-controls">
                <button
                  className="capability-map__zoom-button"
                  aria-label="Zoom in"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className="capability-map__zoom-button"
                  aria-label="Zoom out"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div
                className="capability-map__diagram-inner"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.2s ease',
                }}
              >
                {renderProcessDiagram()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CapabilityMap;
