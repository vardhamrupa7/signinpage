import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundCharts from './components/BackgroundCharts';
import StudentLookupView from './components/StudentLookupView';
import OverviewKPIs from './components/OverviewKPIs';
import ChartsSection from './components/ChartsSection';
import SegmentationView from './components/SegmentationView';
import DataIntegrationHub from './components/DataIntegrationHub';
import DemoTourModal from './components/DemoTourModal';
import StudentModal from './components/StudentModal';
import InterventionModal from './components/InterventionModal';
import WhatIfSimulatorModal from './components/WhatIfSimulatorModal';
import ImportDatasetModal from './components/ImportDatasetModal';
import FacultyAdminDashboard from './components/FacultyAdminDashboard';
import AuthPage from './components/AuthPage';
import { getEnrichedStudents } from './data/studentsData';
import { ensureDemoAccounts, getSessionUser, signOut } from './utils/authStore';

// Which tabs each role may open.
const ROLE_TABS = {
  student: ['lookup'],
  faculty: ['lookup', 'admin', 'segmentation'],
  admin: ['lookup', 'admin', 'segmentation', 'integration']
};

export default function App() {
  const [students, setStudents] = useState(() => getEnrichedStudents());
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState('lookup'); // 'lookup', 'admin', 'segmentation', 'integration'
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);
  const [interventionStudent, setInterventionStudent] = useState(null);
  const [simulatorStudent, setSimulatorStudent] = useState(null);
  const [showDemoTour, setShowDemoTour] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

  // Restore a saved session (and create the demo accounts) when the app starts
  useEffect(() => {
    let cancelled = false;
    ensureDemoAccounts()
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        const user = getSessionUser();
        if (user) {
          setCurrentUser(user);
          setActiveTab(user.role === 'student' ? 'lookup' : 'admin');
        }
        setAuthReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAuthenticated = (user) => {
    setCurrentUser(user);
    setActiveTab(user.role === 'student' ? 'lookup' : 'admin');
  };

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
    setSelectedStudentForModal(null);
    setInterventionStudent(null);
    setSimulatorStudent(null);
    setShowDemoTour(false);
    setShowImportModal(false);
    setActiveTab('lookup');
  };

  // CSV Export utility
  const handleExportCsv = () => {
    const headers = [
      'ID', 'USN', 'Name', 'Department', 'Semester', 'CGPA', 'Backlogs', 
      'Overall Attendance (%)', 'Coding Score', 'Aptitude Score', 'LMS Completion (%)', 
      'Success Score', 'Overall Risk', 'Cohort'
    ];

    const rows = students.map(s => [
      s.id,
      s.usn,
      `"${s.name}"`,
      `"${s.department}"`,
      s.semester,
      s.academic.cgpa.toFixed(2),
      s.academic.backlogs,
      s.attendance.overall,
      s.placement.codingScore,
      s.placement.aptitudeScore,
      s.lms.assignmentCompletionRate,
      s.metrics.compositeScore,
      s.metrics.risks.overall,
      `"${s.cohort.name}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Smart_Campus_Student_Success_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // ---------------------------- Authentication gate ----------------------------
  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-sm text-slate-400">
        Loading…
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage students={students} onAuthenticated={handleAuthenticated} />;
  }

  const role = currentUser.role;
  const isStudent = role === 'student';
  const isAdmin = role === 'admin';
  const allowedTabs = ROLE_TABS[role] || ['lookup'];
  const visibleTab = allowedTabs.includes(activeTab) ? activeTab : allowedTabs[0];

  // A student can only ever see the record linked to their own USN
  const ownRecord = isStudent
    ? students.find((s) => String(s.usn).toUpperCase() === String(currentUser.usn).toUpperCase()) || null
    : null;

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col bg-[#0b0f19]">
      {/* Background Layer: Animated Student Analysis Pie Chart & Attendance Graph Curves */}
      <BackgroundCharts students={students} />

      {/* Top Sticky Navigation */}
      <Navbar
        user={currentUser}
        activeTab={visibleTab}
        setActiveTab={setActiveTab}
        allowedTabs={allowedTabs}
        canImport={isAdmin}
        canExport={!isStudent}
        canDemo={!isStudent}
        onExportCsv={handleExportCsv}
        onPrintReport={handlePrintReport}
        onOpenDemoTour={() => setShowDemoTour(true)}
        onOpenImport={() => setShowImportModal(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {/* PRIMARY VIEW: STUDENT LOOKUP BY ID (USER REQUEST: Type ID -> ONLY THEN see details) */}
        {visibleTab === 'lookup' && isStudent && !ownRecord && (
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
            <h2 className="text-lg font-bold text-amber-200">No analytics found for {currentUser.usn}</h2>
            <p className="mt-2 text-sm text-amber-100/80">
              Your account is linked to this USN, but it is not in the current student data. Ask your
              administrator to check the uploaded file.
            </p>
          </div>
        )}

        {visibleTab === 'lookup' && isStudent && ownRecord && (
          <StudentLookupView
            key={ownRecord.usn}
            students={students}
            lockedStudent={ownRecord}
          />
        )}

        {visibleTab === 'lookup' && !isStudent && (
          <StudentLookupView
            students={students}
            initialStudentId="1RV22CS042"
          />
        )}

        {/* VIEW 2: INTERACTIVE DASHBOARD FOR FACULTY AND ADMINISTRATORS */}
        {visibleTab === 'admin' && (
          <FacultyAdminDashboard
            students={students}
            onSelectStudent={setSelectedStudentForModal}
            onOpenIntervention={setInterventionStudent}
            onOpenSimulator={setSimulatorStudent}
          />
        )}

        {/* VIEW 3: BEHAVIORAL COHORT SEGMENTATION (BONUS CREDIT) */}
        {visibleTab === 'segmentation' && (
          <SegmentationView
            students={students}
            onSelectStudent={setSelectedStudentForModal}
            onOpenIntervention={setInterventionStudent}
            onOpenSimulator={setSimulatorStudent}
          />
        )}

        {/* VIEW 4: DATA INTEGRATION HUB (CORE SCOPE 30%) */}
        {visibleTab === 'integration' && (
          <DataIntegrationHub students={students} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-6 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-300">Smart Campus Analytics</span>
            <span>•</span>
            <span>Secure Student Success & Predictive Intervention Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>AICTE Statutory 75% Rule Compliance</span>
            <span>•</span>
            <span>Explainable AI (XAI) Attribution</span>
            {!isStudent && (
              <>
                <span>•</span>
                <button
                  onClick={() => setShowDemoTour(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Demo Tour Guide
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedStudentForModal && (
        <StudentModal
          student={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
          onOpenIntervention={(s) => {
            setSelectedStudentForModal(null);
            setInterventionStudent(s);
          }}
          onOpenSimulator={(s) => {
            setSelectedStudentForModal(null);
            setSimulatorStudent(s);
          }}
        />
      )}

      {interventionStudent && (
        <InterventionModal
          student={interventionStudent}
          onClose={() => setInterventionStudent(null)}
        />
      )}

      {simulatorStudent && (
        <WhatIfSimulatorModal
          student={simulatorStudent}
          onClose={() => setSimulatorStudent(null)}
          onSelectStudent={(s) => {
            setSimulatorStudent(null);
            setSelectedStudentForModal(s);
          }}
        />
      )}

      {showDemoTour && !isStudent && (
        <DemoTourModal
          students={students}
          onClose={() => setShowDemoTour(false)}
          onSelectStudent={(s) => {
            setSelectedStudentForModal(s);
          }}
          onOpenSimulator={setSimulatorStudent}
          onOpenIntervention={setInterventionStudent}
        />
      )}

      {showImportModal && isAdmin && (
        <ImportDatasetModal
          onClose={() => setShowImportModal(false)}
          onImportSuccess={(newStudents) => {
            setStudents(newStudents);
            alert(`🎉 Success! ${newStudents.length} student records imported. The platform has automatically calculated their Success Scores, Risk Flags, and 7-Pillar telemetry!`);
          }}
        />
      )}
    </div>
  );
}
