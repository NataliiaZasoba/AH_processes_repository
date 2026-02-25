import React, { useState, useMemo } from 'react';
import Header from './components/Header/Header';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import PageHeader from './components/PageHeader/PageHeader';
import ProcessGrid from './components/ProcessGrid/ProcessGrid';
import CapabilityMap from './components/CapabilityMap/CapabilityMap';
import ProcessDetail from './components/ProcessDetail/ProcessDetail';
import ProcessSubmission from './components/ProcessSubmission/ProcessSubmission';
import SubmissionTypeSelector from './components/SubmissionTypeSelector/SubmissionTypeSelector';
import IdeaSubmission from './components/IdeaSubmission/IdeaSubmission';
import ChangeRequestSubmission from './components/ChangeRequestSubmission/ChangeRequestSubmission';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';
import IdeasPage from './components/IdeasPage/IdeasPage';
import IdeaProfile from './components/IdeaProfile/IdeaProfile';
import { processes as initialProcesses, breadcrumbItems } from './data/mockData';
import './App.css';

function App() {
  const [processes, setProcesses] = useState(
    initialProcesses.map(p => ({ ...p, linkedToMap: true }))
  );
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isMapConnected, setIsMapConnected] = useState(true);
  const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
  // null | 'type-select' | 'idea' | 'change-request' | 'business-process'
  const [submissionStep, setSubmissionStep] = useState(null);
  // 'explore' | 'ideas'
  const [currentPage, setCurrentPage] = useState('explore');

  const handleFilterChange = (category) => setCategoryFilter(category);
  const handleClearFilter = () => setCategoryFilter(null);
  const handleProcessClick = (process) => setSelectedProcess(process);
  const handleCloseProcessDetail = () => setSelectedProcess(null);
  const handleIdeaClick = (idea) => setSelectedIdea(idea);
  const handleCloseIdeaProfile = () => setSelectedIdea(null);
  const handleConnectMap = () => setIsMapConnected(true);

  // Submission flow
  const handleShowTypeSelector = () => setSubmissionStep('type-select');
  const handleSelectSubmissionType = (type) => setSubmissionStep(type);
  const handleBackToTypeSelector = () => setSubmissionStep('type-select');
  const handleCancelSubmission = () => setSubmissionStep(null);

  const handleToggleProcessLink = (processId) => {
    setProcesses(prev =>
      prev.map(p => p.id === processId ? { ...p, linkedToMap: !p.linkedToMap } : p)
    );
  };

  const handleSubmitProcess = (formData) => {
    const newProcess = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      owner: formData.owner,
      ownerAvatar: formData.owner.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      category: formData.category,
      status: null,
      profileStatus: 'Backlog',
      metrics: { inProgress: 0, inQueue: 0 },
      lastUpdatedAt: new Date().toISOString(),
      linkedToMap: formData.linkToMap || false,
    };
    setProcesses(prev => [...prev, newProcess]);
    setSubmissionStep(null);
  };

  const [ideas, setIdeas] = useState([
    { id: 1,  title: 'Automate invoice processing',           description: 'Use RPA to extract data from incoming invoices and post entries to ERP automatically, reducing manual entry errors.',                      submitter: 'Natalia Zancu',  submitterAvatar: 'NZ', status: 'Approved',      phase: 'Solution Design', businessArea: 'Finance & Accounting', submissionType: 'Idea',            submittedAt: new Date(Date.now() - 2  * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 1  * 86400000).toISOString() },
    { id: 2,  title: 'HR onboarding document generation',     description: 'Automatically generate and send onboarding documents to new hires based on role and department data from HRIS.',                         submitter: 'James Caldwell', submitterAvatar: 'JC', status: 'Under review',  phase: 'Assessment',      businessArea: 'Human Resources',      submissionType: 'Idea',            submittedAt: new Date(Date.now() - 5  * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 2  * 86400000).toISOString() },
    { id: 3,  title: 'Customer refund status notifications',  description: 'Send automated email updates to customers when their refund status changes in the billing system.',                                       submitter: 'Sofia Patel',    submitterAvatar: 'SP', status: 'Backlog',       phase: 'Idea',            businessArea: 'Customer Support',     submissionType: 'Change Request',  submittedAt: new Date(Date.now() - 7  * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 7  * 86400000).toISOString() },
    { id: 4,  title: 'Payroll reconciliation automation',     description: 'Reconcile payroll data across HR, Finance, and banking systems to flag discrepancies before payroll runs.',                              submitter: 'Marcus Lee',     submitterAvatar: 'ML', status: 'Approved',      phase: 'Implementation',  businessArea: 'Finance & Accounting', submissionType: 'Business Process', submittedAt: new Date(Date.now() - 10 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 3  * 86400000).toISOString() },
    { id: 5,  title: 'Automated compliance report generation',description: 'Pull data from multiple regulatory systems and compile monthly compliance reports with zero manual intervention.',                        submitter: 'Natalia Zancu',  submitterAvatar: 'NZ', status: 'Under review',  phase: 'Assessment',      businessArea: 'Finance & Accounting', submissionType: 'Idea',            submittedAt: new Date(Date.now() - 12 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 4  * 86400000).toISOString() },
    { id: 6,  title: 'Lead scoring and CRM enrichment',       description: 'Automatically score inbound leads using firmographic data and enrich CRM records from third-party sources.',                             submitter: 'Priya Sharma',   submitterAvatar: 'PS', status: 'Backlog',       phase: 'Idea',            businessArea: 'Marketing & Sales',    submissionType: 'Idea',            submittedAt: new Date(Date.now() - 14 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 14 * 86400000).toISOString() },
    { id: 7,  title: 'IT ticket triage and routing',          description: 'Classify incoming IT support tickets by priority and category, then route them to the correct team automatically.',                       submitter: 'Daniel Torres',  submitterAvatar: 'DT', status: 'Approved',      phase: 'Done',            businessArea: 'Service Delivery',     submissionType: 'Change Request',  submittedAt: new Date(Date.now() - 16 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 1  * 86400000).toISOString() },
    { id: 8,  title: 'Vendor onboarding workflow',            description: 'Streamline vendor onboarding by automating document collection, validation, and ERP registration steps.',                                submitter: 'Elena Moser',    submitterAvatar: 'EM', status: 'Backlog',       phase: 'Idea',            businessArea: 'Service Delivery',     submissionType: 'Business Process', submittedAt: new Date(Date.now() - 18 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 18 * 86400000).toISOString() },
    { id: 9,  title: 'Monthly sales report distribution',     description: 'Automatically generate and email monthly sales performance reports to regional managers from CRM data.',                                  submitter: 'James Caldwell', submitterAvatar: 'JC', status: 'Rejected',      phase: 'Idea',            businessArea: 'Marketing & Sales',    submissionType: 'Idea',            submittedAt: new Date(Date.now() - 20 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 6  * 86400000).toISOString() },
    { id: 10, title: 'Purchase order approval reminders',     description: 'Send automated reminders to approvers for pending purchase orders approaching SLA deadlines.',                                           submitter: 'Sofia Patel',    submitterAvatar: 'SP', status: 'Under review',  phase: 'Assessment',      businessArea: 'Finance & Accounting', submissionType: 'Change Request',  submittedAt: new Date(Date.now() - 22 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 5  * 86400000).toISOString() },
    { id: 11, title: 'Employee expense report validation',    description: 'Validate submitted expense reports against policy rules and flag violations before finance review.',                                      submitter: 'Marcus Lee',     submitterAvatar: 'ML', status: 'Backlog',       phase: 'Idea',            businessArea: 'Finance & Accounting', submissionType: 'Idea',            submittedAt: new Date(Date.now() - 24 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 24 * 86400000).toISOString() },
    { id: 12, title: 'Contract renewal alerts',               description: 'Monitor contract expiry dates and automatically notify relevant stakeholders 90, 60, and 30 days before renewal.',                       submitter: 'Priya Sharma',   submitterAvatar: 'PS', status: 'Approved',      phase: 'Implementation',  businessArea: 'Service Delivery',     submissionType: 'Idea',            submittedAt: new Date(Date.now() - 26 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 2  * 86400000).toISOString() },
    { id: 13, title: 'Quality control data entry',            description: 'Automate data entry of QC inspection results from spreadsheets into the quality management system.',                                     submitter: 'Daniel Torres',  submitterAvatar: 'DT', status: 'Under review',  phase: 'Solution Design', businessArea: 'Service Delivery',     submissionType: 'Business Process', submittedAt: new Date(Date.now() - 28 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 8  * 86400000).toISOString() },
    { id: 14, title: 'Benefits enrollment reminders',         description: 'Send personalized benefits enrollment reminders to employees during open enrollment periods.',                                           submitter: 'Elena Moser',    submitterAvatar: 'EM', status: 'Backlog',       phase: 'Idea',            businessArea: 'Human Resources',      submissionType: 'Idea',            submittedAt: new Date(Date.now() - 30 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 30 * 86400000).toISOString() },
    { id: 15, title: 'Customer account health scoring',       description: 'Calculate weekly account health scores from product usage, support tickets, and NPS data to flag at-risk customers.',                    submitter: 'Natalia Zancu',  submitterAvatar: 'NZ', status: 'Approved',      phase: 'Done',            businessArea: 'Customer Support',     submissionType: 'Business Process', submittedAt: new Date(Date.now() - 32 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 3  * 86400000).toISOString() },
    { id: 16, title: 'Automated tax filing preparation',      description: 'Aggregate tax-relevant data from ERP and payroll systems to prepare draft tax filings for review.',                                      submitter: 'James Caldwell', submitterAvatar: 'JC', status: 'Backlog',       phase: 'Idea',            businessArea: 'Finance & Accounting', submissionType: 'Idea',            submittedAt: new Date(Date.now() - 35 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 35 * 86400000).toISOString() },
    { id: 17, title: 'Logistics shipment tracking updates',   description: 'Automatically pull shipment status from carrier APIs and update order management system records in real time.',                           submitter: 'Sofia Patel',    submitterAvatar: 'SP', status: 'Under review',  phase: 'Assessment',      businessArea: 'Service Delivery',     submissionType: 'Change Request',  submittedAt: new Date(Date.now() - 38 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 9  * 86400000).toISOString() },
    { id: 18, title: 'Recruitment pipeline status sync',      description: 'Sync candidate status between the ATS and HRIS to keep both systems aligned without manual updates.',                                    submitter: 'Marcus Lee',     submitterAvatar: 'ML', status: 'Rejected',      phase: 'Idea',            businessArea: 'Human Resources',      submissionType: 'Idea',            submittedAt: new Date(Date.now() - 40 * 86400000).toISOString(), lastUpdatedAt: new Date(Date.now() - 12 * 86400000).toISOString() },
  ]);

  const handleSubmitIdea = (formData) => {
    const newIdea = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      submitter: formData.submitter,
      submitterAvatar: formData.submitter.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      expectedBenefit: formData.expectedBenefit,
      status: 'Backlog',
      submittedAt: new Date().toISOString(),
    };
    setIdeas(prev => [...prev, newIdea]);
    setSubmissionStep(null);
    setCurrentPage('ideas');
  };

  const handleSubmitChangeRequest = (formData) => {
    // Future: persist change request
    setSubmissionStep(null);
  };

  const handleUnlinkMap = () => setShowUnlinkDialog(true);

  const handleConfirmUnlink = () => {
    setIsMapConnected(false);
    setCategoryFilter(null);
    setShowUnlinkDialog(false);
  };

  const handleCancelUnlink = () => setShowUnlinkDialog(false);

  const filteredProcesses = useMemo(() => {
    if (!categoryFilter) return processes;
    return processes.filter(p => p.category && p.category.includes(categoryFilter));
  }, [categoryFilter, processes]);

  return (
    <div className="app">
      {submissionStep === 'type-select' ? (
        <SubmissionTypeSelector
          onSelectType={handleSelectSubmissionType}
          onCancel={handleCancelSubmission}
        />
      ) : submissionStep === 'idea' ? (
        <IdeaSubmission
          onSubmit={handleSubmitIdea}
          onBack={handleBackToTypeSelector}
          onCancel={handleCancelSubmission}
        />
      ) : submissionStep === 'change-request' ? (
        <ChangeRequestSubmission
          onSubmit={handleSubmitChangeRequest}
          onBack={handleBackToTypeSelector}
          onCancel={handleCancelSubmission}
        />
      ) : submissionStep === 'business-process' ? (
        <ProcessSubmission
          onSubmit={handleSubmitProcess}
          onCancel={handleBackToTypeSelector}
        />
      ) : selectedIdea ? (
        <IdeaProfile
          idea={selectedIdea}
          onClose={handleCloseIdeaProfile}
        />
      ) : selectedProcess ? (
        <ProcessDetail
          process={selectedProcess}
          onClose={handleCloseProcessDetail}
        />
      ) : (
        <>
          <Header
            onSubmitClick={handleShowTypeSelector}
            onNavigate={setCurrentPage}
            currentPage={currentPage}
          />
          {currentPage === 'ideas' ? (
            <IdeasPage
              ideas={ideas}
              onSubmitIdea={() => setSubmissionStep('idea')}
              onIdeaClick={handleIdeaClick}
            />
          ) : (
            <main className="app__main">
              <Breadcrumb items={breadcrumbItems} />
              <PageHeader
                title="Process repository"
                actionText={isMapConnected ? null : "Connect capability map"}
                onActionClick={handleConnectMap}
                isActionDisabled={isMapConnected}
              />
              {isMapConnected && (
                <CapabilityMap
                  processes={processes}
                  onFilterChange={handleFilterChange}
                  onUnlink={handleUnlinkMap}
                  onToggleLink={handleToggleProcessLink}
                />
              )}
              <ProcessGrid
                processes={filteredProcesses}
                activeFilter={categoryFilter}
                onClearFilter={handleClearFilter}
                onProcessClick={handleProcessClick}
                onToggleLink={handleToggleProcessLink}
              />
            </main>
          )}
          <ConfirmDialog
            isOpen={showUnlinkDialog}
            title="Unlink Capability map"
            message="Are you sure you want to unlink the Capability map? This will remove it from the process repository view."
            onConfirm={handleConfirmUnlink}
            onCancel={handleCancelUnlink}
          />
        </>
      )}
    </div>
  );
}

export default App;
