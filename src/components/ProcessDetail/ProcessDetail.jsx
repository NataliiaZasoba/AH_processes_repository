import React, { useState, useEffect, useRef } from 'react';
import './ProcessDetail.css';

const ProcessDetail = ({ process, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const legendRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (legendRef.current && !legendRef.current.contains(event.target)) {
        setIsLegendOpen(false);
      }
    };
    if (isLegendOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLegendOpen]);

  if (!process) return null;

  const handleZoomIn  = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  const renderBPMNDiagram = () => (
    <svg className="process-detail__bpmn-diagram" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="arrowhead-bpmn" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#5E6C84" />
        </marker>
      </defs>
      <g className="bpmn-start-event">
        <circle cx="50" cy="200" r="20" fill="#E3FCEF" stroke="#00875A" strokeWidth="2" />
        <text x="50" y="240" textAnchor="middle" fontSize="11" fill="#5E6C84">Start</text>
      </g>
      <line x1="70" y1="200" x2="120" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <g className="bpmn-task">
        <rect x="120" y="170" width="140" height="60" rx="8" fill="#E6F0FF" stroke="#0066FF" strokeWidth="2" />
        <text x="190" y="195" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Initial Data</text>
        <text x="190" y="210" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Collection</text>
      </g>
      <line x1="260" y1="200" x2="310" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <g className="bpmn-gateway">
        <path d="M 350 200 L 380 170 L 410 200 L 380 230 Z" fill="#FFF4E5" stroke="#FF991F" strokeWidth="2" />
        <text x="380" y="205" textAnchor="middle" fontSize="18" fill="#FF991F" fontWeight="bold">?</text>
        <text x="380" y="250" textAnchor="middle" fontSize="11" fill="#5E6C84">Valid?</text>
      </g>
      <line x1="410" y1="200" x2="460" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <text x="425" y="190" fontSize="10" fill="#00875A">Yes</text>
      <path d="M 380 230 L 380 280 L 190 280 L 190 230" stroke="#5E6C84" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-bpmn)" />
      <text x="280" y="295" fontSize="10" fill="#DE350B">No</text>
      <g className="bpmn-task">
        <rect x="460" y="170" width="140" height="60" rx="8" fill="#E6F0FF" stroke="#0066FF" strokeWidth="2" />
        <text x="530" y="195" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Process &amp;</text>
        <text x="530" y="210" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Transform Data</text>
      </g>
      <line x1="600" y1="200" x2="650" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <g className="bpmn-task">
        <rect x="650" y="170" width="140" height="60" rx="8" fill="#E6F0FF" stroke="#0066FF" strokeWidth="2" />
        <text x="720" y="195" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Generate</text>
        <text x="720" y="210" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Output</text>
      </g>
      <line x1="790" y1="200" x2="840" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <g className="bpmn-task">
        <rect x="840" y="170" width="100" height="60" rx="8" fill="#E6F0FF" stroke="#0066FF" strokeWidth="2" />
        <text x="890" y="195" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Send</text>
        <text x="890" y="210" textAnchor="middle" fontSize="12" fill="#172B4D" fontWeight="500">Notification</text>
      </g>
      <line x1="940" y1="200" x2="970" y2="200" stroke="#5E6C84" strokeWidth="2" markerEnd="url(#arrowhead-bpmn)" />
      <g className="bpmn-end-event">
        <circle cx="990" cy="200" r="20" fill="#FFEBE6" stroke="#DE350B" strokeWidth="4" />
        <text x="990" y="240" textAnchor="middle" fontSize="11" fill="#5E6C84">End</text>
      </g>
      <text x="10" y="100" fontSize="12" fill="#5E6C84" fontWeight="600" transform="rotate(-90 10 100)">Automated</text>
    </svg>
  );

  return (
    <div className="process-detail-page">

      {/* ── Sticky header ─────────────────────────────── */}
      <header className="process-detail__header">
        <div className="process-detail__header-top">
          <button className="process-detail__back-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Processes
          </button>
        </div>

        <div className="process-detail__header-main">
          <div className="process-detail__title-row">
            <h1 className="process-detail__title">{process.title}</h1>
            {process.status && (
              <div className="process-detail__badges">
                <span className="process-detail__badge">{process.status}</span>
              </div>
            )}
          </div>
          <div className="process-detail__header-actions">
            <button className="process-detail__action-btn process-detail__action-btn--secondary">
              Edit Process
            </button>
            <button className="process-detail__action-btn process-detail__action-btn--primary">
              Start Automation
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="process-detail__body">

        {/* Main content */}
        <main className="process-detail__main">

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Description</h2>
            <p className="process-detail__description">{process.description}</p>
          </section>

          {process.metrics && (
            <section className="process-detail__section">
              <h2 className="process-detail__section-title">Metrics</h2>
              <div className="process-detail__metrics-grid">
                <div className="process-detail__metric-card">
                  <span className="process-detail__metric-label">In Progress</span>
                  <span className="process-detail__metric-value">{process.metrics.inProgress}</span>
                </div>
                <div className="process-detail__metric-card">
                  <span className="process-detail__metric-label">In Queue</span>
                  <span className="process-detail__metric-value">{process.metrics.inQueue}</span>
                </div>
                <div className="process-detail__metric-card">
                  <span className="process-detail__metric-label">Completed</span>
                  <span className="process-detail__metric-value">1,247</span>
                </div>
                <div className="process-detail__metric-card">
                  <span className="process-detail__metric-label">Success Rate</span>
                  <span className="process-detail__metric-value">94%</span>
                </div>
              </div>
            </section>
          )}

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Process steps</h2>
            <div className="process-detail__steps">
              {[
                { title: 'Initial Data Collection', desc: 'Gather all required information and documents from the source system.' },
                { title: 'Validation & Verification', desc: 'Validate data integrity and verify against business rules.' },
                { title: 'Processing', desc: 'Execute the main process logic and transformations.' },
                { title: 'Output & Notification', desc: 'Generate output and notify relevant stakeholders.' },
              ].map((step, i) => (
                <div key={i} className="process-detail__step">
                  <div className="process-detail__step-number">{i + 1}</div>
                  <div className="process-detail__step-content">
                    <h3 className="process-detail__step-title">{step.title}</h3>
                    <p className="process-detail__step-description">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="process-detail__section">
            <div className="process-detail__bpmn-header">
              <h2 className="process-detail__section-title">BPMN Process Diagram</h2>
              <div className="process-detail__bpmn-actions">
                <div className="process-detail__legend-wrapper" ref={legendRef}>
                  <button
                    className="process-detail__bpmn-button"
                    onClick={() => setIsLegendOpen(o => !o)}
                  >
                    Legend
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isLegendOpen && (
                    <div className="process-detail__legend-dropdown">
                      {[
                        { label: 'Start Event', shape: <svg width="30" height="20" viewBox="0 0 30 20"><circle cx="10" cy="10" r="8" fill="#E3FCEF" stroke="#00875A" strokeWidth="2" /></svg> },
                        { label: 'Task/Activity', shape: <svg width="40" height="20" viewBox="0 0 40 20"><rect x="2" y="2" width="36" height="16" rx="4" fill="#E6F0FF" stroke="#0066FF" strokeWidth="2" /></svg> },
                        { label: 'Gateway/Decision', shape: <svg width="30" height="20" viewBox="0 0 30 20"><path d="M 15 2 L 28 10 L 15 18 L 2 10 Z" fill="#FFF4E5" stroke="#FF991F" strokeWidth="2" /></svg> },
                        { label: 'End Event', shape: <svg width="30" height="20" viewBox="0 0 30 20"><circle cx="15" cy="10" r="8" fill="#FFEBE6" stroke="#DE350B" strokeWidth="3" /></svg> },
                      ].map(({ label, shape }) => (
                        <div key={label} className="process-detail__legend-item">
                          {shape}
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="process-detail__bpmn-button">
                  <span>Open in Studio Web</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4H14V14H4V12M12 4L6 10M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="process-detail__bpmn-button" aria-label="Download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 11V14H2V11M11 7L8 10M8 10L5 7M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="process-detail__bpmn-container">
              <div className="process-detail__bpmn-zoom-controls">
                <button className="process-detail__bpmn-zoom-button" onClick={handleZoomIn} disabled={zoomLevel >= 3} aria-label="Zoom in">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                <button className="process-detail__bpmn-zoom-button" onClick={handleZoomOut} disabled={zoomLevel <= 0.5} aria-label="Zoom out">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}>
                {renderBPMNDiagram()}
              </div>
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="process-detail__sidebar">

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Details</h2>
            <div className="process-detail__details">
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Owner</span>
                <div className="process-detail__detail-value">
                  <div className="process-detail__owner">
                    <div className="process-detail__avatar">{process.ownerAvatar}</div>
                    <span>{process.owner}</span>
                  </div>
                </div>
              </div>
              {process.category && (
                <div className="process-detail__detail-row">
                  <span className="process-detail__detail-label">Category</span>
                  <div className="process-detail__detail-value">{process.category}</div>
                </div>
              )}
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Created</span>
                <div className="process-detail__detail-value">Jan 15, 2026</div>
              </div>
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Last updated</span>
                <div className="process-detail__detail-value">2 days ago</div>
              </div>
            </div>
          </section>

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Automation</h2>
            <div className="process-detail__details">
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Level</span>
                <div className="process-detail__detail-value">
                  <span className="process-detail__badge process-detail__badge--success">High</span>
                </div>
              </div>
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Robot type</span>
                <div className="process-detail__detail-value">Attended</div>
              </div>
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Avg. duration</span>
                <div className="process-detail__detail-value">3.5 minutes</div>
              </div>
              <div className="process-detail__detail-row">
                <span className="process-detail__detail-label">Frequency</span>
                <div className="process-detail__detail-value">Daily</div>
              </div>
            </div>
          </section>

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Related processes</h2>
            <div className="process-detail__related-list">
              {['Invoice Processing', 'Payment Verification', 'Financial Reporting'].map(name => (
                <a key={name} href={`#${name}`} className="process-detail__related-item">{name}</a>
              ))}
            </div>
          </section>

          <section className="process-detail__section">
            <h2 className="process-detail__section-title">Documents</h2>
            <div className="process-detail__documents">
              {['Process_Documentation.pdf', 'Requirements_Spec.docx'].map(name => (
                <a key={name} href={`#${name}`} className="process-detail__document-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 2H10L13 5V14H3V2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ProcessDetail;
