import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Laptop, 
  Briefcase, 
  Award, 
  HeartHandshake, 
  TrendingUp, 
  SlidersHorizontal,
  Mail,
  Copy,
  Check,
  Printer,
  ChevronRight,
  Database,
  Layers,
  ShieldAlert,
  UserCheck,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { Line, Radar } from 'react-chartjs-2';
import { simulateStudentScenario } from '../utils/simulationEngine';

export default function StudentLookupView({ students, initialStudentId = '1RV22CS042', lockedStudent = null }) {
  const [searchInput, setSearchInput] = useState(initialStudentId);
  const [activeStudent, setActiveStudent] = useState(() => {
    if (lockedStudent) return lockedStudent;
    return students.find(s => 
      s.usn.toLowerCase() === initialStudentId.toLowerCase() || 
      s.id.toLowerCase() === initialStudentId.toLowerCase()
    ) || students[0];
  });

  const [activePillarView, setActivePillarView] = useState('ALL'); // 'ALL' shows all 7 unified streams, or filter by specific stream
  const [copiedEmail, setCopiedEmail] = useState(false);

  // What-If Simulator state
  const [attendanceDelta, setAttendanceDelta] = useState(12);
  const [lmsCompletionDelta, setLmsCompletionDelta] = useState(25);
  const [backlogsOverride, setBacklogsOverride] = useState(0);
  const [codingDelta, setCodingDelta] = useState(18);

  // Quick Demo ID chips
  const sampleIds = [
    { usn: '1RV22CS042', name: 'Rohan Verma', label: 'Critical At-Risk', color: 'rose' },
    { usn: '1RV22AI018', name: 'Priya Sharma', label: 'Tech Prodigy / Attendance Slump', color: 'cyan' },
    { usn: '1RV21CS089', name: 'Ananya Iyer', label: 'Placement Vulnerable Topper', color: 'amber' },
    { usn: '1RV21CS112', name: 'Tanvi Patel', label: 'Campus Star Achiever', color: 'indigo' },
    { usn: '1RV22EC055', name: 'Siddharth Rao', label: 'Disengaged Inactive', color: 'orange' }
  ];

  const handleSearch = (usnOrId) => {
    const query = (usnOrId || searchInput).trim().toLowerCase();
    const found = students.find(
      s => s.usn.toLowerCase() === query || 
           s.id.toLowerCase() === query ||
           s.name.toLowerCase().includes(query)
    );

    if (found) {
      setActiveStudent(found);
      setSearchInput(found.usn);
      setBacklogsOverride(0);
    } else {
      alert(`Student with ID / USN "${searchInput}" not found. Try one of the suggested sample IDs.`);
    }
  };

  const handleSelectSample = (usn) => {
    setSearchInput(usn);
    handleSearch(usn);
  };

  const resetSimulation = () => {
    setAttendanceDelta(0);
    setLmsCompletionDelta(0);
    setBacklogsOverride(activeStudent?.academic.backlogs || 0);
    setCodingDelta(0);
  };

  if (!activeStudent) return null;

  const { metrics, cohort, explanation } = activeStudent;
  const score = metrics.compositeScore;
  const risks = metrics.risks;

  // Run What-If Simulation
  const simulation = simulateStudentScenario(activeStudent, {
    attendanceDelta,
    lmsCompletionDelta,
    backlogsOverride,
    codingDelta
  });

  // Chart data: Semester GPA History
  const semesterLabels = activeStudent.academic.semesterHistory.map((_, idx) => `Sem ${idx + 1}`);
  const gpaTrendData = {
    labels: semesterLabels,
    datasets: [
      {
        label: 'Semester GPA (SGPA)',
        data: activeStudent.academic.semesterHistory,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#818cf8'
      }
    ]
  };

  const gpaTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
      y: { min: 4.0, max: 10.0, grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } }
    },
    plugins: { legend: { display: false } }
  };

  // Chart data: Weekly Attendance Trend
  const weeklyAttendanceLabels = activeStudent.attendance.weeklyTrend.map((_, idx) => `Wk ${idx + 1}`);
  const attendanceTrendData = {
    labels: weeklyAttendanceLabels,
    datasets: [
      {
        label: 'Weekly Attendance (%)',
        data: activeStudent.attendance.weeklyTrend,
        borderColor: activeStudent.attendance.overall < 75 ? '#f43f5e' : '#10b981',
        backgroundColor: activeStudent.attendance.overall < 75 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  const attendanceTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
      y: { min: 40, max: 100, grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } }
    },
    plugins: { legend: { display: false } }
  };

  // Skills Radar
  const skillsData = {
    labels: ['DSA', 'Web/Cloud', 'Database', 'Problem Solving', 'Communication', 'Teamwork', 'Critical Thinking'],
    datasets: [
      {
        label: `${activeStudent.name}'s Proficiency`,
        data: [
          activeStudent.skills.technical.dsa,
          activeStudent.skills.technical.webCloud,
          activeStudent.skills.technical.dbSystem,
          activeStudent.skills.technical.problemSolving,
          activeStudent.skills.soft.communication,
          activeStudent.skills.soft.teamwork,
          activeStudent.skills.soft.criticalThinking
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#818cf8',
        borderWidth: 2
      },
      {
        label: 'Batch Benchmark',
        data: [70, 68, 72, 70, 75, 78, 74],
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        borderColor: '#94a3b8',
        borderDash: [4, 4],
        borderWidth: 1.5,
        pointRadius: 2
      }
    ]
  };

  const skillsRadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#1e293b' },
        grid: { color: '#1e293b' },
        pointLabels: { color: '#94a3b8', font: { size: 10 } },
        ticks: { color: '#64748b', backdropColor: 'transparent', stepSize: 20 },
        suggestedMin: 30,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true } }
    }
  };

  // Pre-drafted automated email
  const studentEmailDraft = `Subject: Confidential Academic Advisory & Personalized Action Plan [${activeStudent.usn}]

Dear ${activeStudent.name},

As part of the Smart Campus Student Success monitoring system, your academic proctor and department committee have reviewed your unified data streams:

• Current Success Score: ${activeStudent.metrics.compositeScore}/100
• Attendance: ${activeStudent.attendance.overall}% ${activeStudent.attendance.overall < 75 ? '(Alert: Below statutory 75% cutoff)' : ''}
• Course Backlogs: ${activeStudent.academic.backlogs}
• Placement Readiness: ${activeStudent.placement.tierEligibility}

Prescribed Action Items:
1. Attend mandatory weekly proctor advising with ${activeStudent.mentor}.
2. Register for academic remedial sessions in: ${activeStudent.academic.failedSubjects?.join(', ') || 'Core Coursework'}.
3. Maintain active daily logins on the LMS portal.

We are committed to helping you succeed!

Office of Academic Affairs & Student Success Platform`;

  const copyEmail = () => {
    navigator.clipboard.writeText(studentEmailDraft);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & ID Lookup Header */}
      {lockedStudent ? (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Your personal analytics
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Welcome, {lockedStudent.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            USN {lockedStudent.usn}. This page shows only your own academic, attendance, LMS, engagement, skills, placement and feedback data.
          </p>
        </div>
      ) : (
      <>
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="max-w-3xl mx-auto text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Single-Student Unified Data Integration Portal
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Enter Student ID / USN to Retrieve Unified Multi-Source Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Data Integration & Analysis (30% Evaluation Weight): Combines Academic, Attendance, LMS, Engagement, Placement, Skills, and Feedback into one unified student view.
          </p>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="max-w-2xl mx-auto flex items-center gap-2 bg-slate-950/90 p-2 rounded-2xl border border-slate-700/80 shadow-inner"
        >
          <Search className="w-5 h-5 text-indigo-400 ml-2 shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Type Student USN or ID (e.g. 1RV22CS042, 1RV22AI018, 1RV21CS089)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2 py-1 font-mono"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="text-xs text-slate-400 hover:text-white px-2"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition shrink-0"
          >
            Retrieve Analytics
          </button>
        </form>

        {/* Quick Demo ID Suggestion Pills */}
        <div className="max-w-3xl mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Quick Demo IDs:</span>
          {sampleIds.map((item) => (
            <button
              key={item.usn}
              onClick={() => handleSelectSample(item.usn)}
              className={`px-2.5 py-1 rounded-xl border text-[11px] font-mono transition flex items-center gap-1.5 ${
                activeStudent?.usn === item.usn
                  ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow'
                  : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                item.color === 'rose' ? 'bg-rose-400' :
                item.color === 'cyan' ? 'bg-cyan-400' :
                item.color === 'amber' ? 'bg-amber-400' :
                item.color === 'indigo' ? 'bg-indigo-400' : 'bg-orange-400'
              }`}></span>
              <span>{item.usn}</span>
              <span className="text-[10px] text-slate-400">({item.name})</span>
            </button>
          ))}
        </div>
      </div>
      </>
      )}

      {/* 7-SOURCE DATA INTEGRATION PIPELINE BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>7 Data Sources Integrated for {activeStudent.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                ✓ Live Unified View
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              ERP (Academic) • RFID (Attendance) • Moodle (LMS) • Portal (Placement) • Diagnostic (Skills) • Registry (Engagement) • Proctor App (Feedback)
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition self-end md:self-auto"
        >
          <Printer className="w-3.5 h-3.5" /> Print Unified Dossier
        </button>
      </div>

      {/* STUDENT PROFILE & STUDENT SUCCESS SCORE CARD */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={activeStudent.avatar} 
            alt={activeStudent.name} 
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-xl"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                {activeStudent.name}
              </h3>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-950 text-indigo-300 border border-slate-700 font-bold">
                {activeStudent.usn}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                risks.overall === 'Critical' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                risks.overall === 'Warning' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                risks.overall === 'Exemplary' ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' :
                'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              }`}>
                {risks.riskBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeStudent.department} • Semester {activeStudent.semester} (Sec {activeStudent.section}) • Mentor: <strong className="text-slate-300">{activeStudent.mentor}</strong>
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
              <span>📧 {activeStudent.email}</span>
              <span>•</span>
              <span>📞 {activeStudent.phone}</span>
            </div>
          </div>
        </div>

        {/* Student Success Score Calculation Breakdown */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 self-stretch lg:self-auto justify-between lg:justify-start">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Student Success Score (SSS)
            </div>
            <div className="text-4xl font-black font-mono text-white mt-0.5">
              {score} <span className="text-sm text-slate-500 font-normal">/ 100</span>
            </div>
            <div className={`text-[10px] font-bold mt-1 ${score >= 72 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {score >= 72 ? `+${score - 72} above baseline` : `${score - 72} below baseline`}
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-800"></div>

          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Behavioral Cohort (Bonus)
            </div>
            <div className="text-xs font-bold text-indigo-300 mt-1.5">
              {cohort.name}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {cohort.badge}
            </div>
          </div>
        </div>
      </div>

      {/* AT-RISK IDENTIFICATION & EXPLAINABLE AI DRIVERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* At-Risk Identification (25% Criteria) */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span>At-Risk Identification</span>
            <span className="text-[10px] font-mono text-indigo-400">Institutional Triggers</span>
          </div>

          {/* 1. Poor Academic Performance Risk */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            risks.academic === 'High' ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' :
            risks.academic === 'Medium' ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' :
            'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">Academic Risk: {risks.academic}</div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {activeStudent.academic.backlogs > 0 ? `${activeStudent.academic.backlogs} Backlog(s) Active` : 'CGPA In Good Standing'}
                </div>
              </div>
            </div>
            <span className="font-bold">{activeStudent.academic.cgpa.toFixed(2)} CGPA</span>
          </div>

          {/* 2. Attendance Debarment Risk (<75% AICTE limit) */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            activeStudent.attendance.overall < 75 ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' :
            activeStudent.attendance.overall < 80 ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' :
            'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">Attendance Risk: {risks.attendance}</div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {activeStudent.attendance.overall < 75 ? 'Breaches 75% Statutory Limit' : 'AICTE Compliant'}
                </div>
              </div>
            </div>
            <span className="font-bold">{activeStudent.attendance.overall}%</span>
          </div>

          {/* 3. Poor Placement Outcomes Risk */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            risks.placement === 'High' ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' :
            risks.placement === 'Medium' ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' :
            'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 shrink-0" />
              <div>
                <div className="font-bold">Placement Risk: {risks.placement}</div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {activeStudent.placement.codingScore < 55 ? 'Coding Below Campus Bar' : 'Placement Eligible'}
                </div>
              </div>
            </div>
            <span className="font-bold">{activeStudent.placement.codingScore}/100</span>
          </div>
        </div>

        {/* Explainable AI Score Drivers (Bonus: Visible Drivers Behind Score) */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" /> Explainable AI (XAI) Score Attribution Drivers
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Baseline Norm: 72.0
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-indigo-300">Executive AI Diagnosis:</strong> {explanation.narrative}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {explanation.drivers.slice(0, 4).map((driver, idx) => (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  driver.type === 'positive' 
                    ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' 
                    : 'bg-rose-950/20 border-rose-500/20 text-rose-300'
                }`}
              >
                <div>
                  <div className="font-bold">{driver.factor}</div>
                  <div className="text-[10px] opacity-80 mt-0.5 line-clamp-1">{driver.detail}</div>
                </div>
                <span className="font-mono font-black text-sm ml-2">
                  {driver.impact > 0 ? `+${driver.impact}` : driver.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ALL 7 SUGGESTED DATA STREAMS DIRECTLY DISPLAYED ON THE PAGE               */}
      {/* (Academic, Attendance, LMS, Engagement, Placement, Skills, Feedback)     */}
      {/* ========================================================================= */}
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Unified Student View: All 7 Suggested Data Categories
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Integrating real-time academic records, attendance logs, LMS engagement, placement scores, and faculty feedback
            </p>
          </div>
        </div>

        {/* STREAM 1: ACADEMIC (CGPA, marks, backlogs, subject performance) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  1. Academic Data Stream (ERP Registrar)
                </h4>
                <span className="text-[11px] text-slate-400">
                  CGPA, continuous marks, course backlogs, and subject-wise performance
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-white">
                CGPA: {activeStudent.academic.cgpa.toFixed(2)}
              </span>
              <span className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold ${
                activeStudent.academic.backlogs > 0 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {activeStudent.academic.backlogs} Backlog(s)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Subject Performance Table */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Subject Code & Name</th>
                    <th className="py-2.5 px-2">Type</th>
                    <th className="py-2.5 px-2">Internal Marks</th>
                    <th className="py-2.5 px-2">Grade</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {activeStudent.academic.subjectPerformance?.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-sans font-semibold text-white">
                        <span className="text-indigo-400 font-mono mr-1.5">{sub.code}</span> {sub.name}
                      </td>
                      <td className="py-2 px-2 text-slate-400">{sub.type}</td>
                      <td className="py-2 px-2 font-bold text-white">{sub.internalMarks} / 100</td>
                      <td className="py-2 px-2 font-bold">{sub.grade}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                          sub.status.includes('Backlog') ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Semester SGPA Trend Line Chart */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-bold text-slate-200 mb-2">Historical Semester SGPA Trend</div>
              <div className="h-44 relative">
                <Line data={gpaTrendData} options={gpaTrendOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* STREAM 2: ATTENDANCE (Overall %, subject-wise attendance) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  2. Attendance Data Stream (Biometric RFID Turnstiles)
                </h4>
                <span className="text-[11px] text-slate-400">
                  Overall %, Theory vs Lab %, and Subject-Wise Attendance with AICTE 75% Cutoff
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold ${
                activeStudent.attendance.overall < 75 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                Overall: {activeStudent.attendance.overall}%
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                Theory: {activeStudent.attendance.theory}% • Lab: {activeStudent.attendance.lab}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Subject-Wise Attendance Table */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Subject Code & Name</th>
                    <th className="py-2.5 px-2">Type</th>
                    <th className="py-2.5 px-2">Attended / Total</th>
                    <th className="py-2.5 px-2">Percentage</th>
                    <th className="py-2.5 px-3">75% Statutory Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {activeStudent.attendance.subjectAttendance?.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-sans font-semibold text-white">
                        <span className="text-emerald-400 font-mono mr-1.5">{sub.code}</span> {sub.name}
                      </td>
                      <td className="py-2 px-2 text-slate-400">{sub.type}</td>
                      <td className="py-2 px-2 font-bold text-white">{sub.attended} / {sub.total} hrs</td>
                      <td className="py-2 px-2 font-bold">
                        <span className={sub.percentage < 75 ? 'text-rose-400' : 'text-emerald-400'}>
                          {sub.percentage}%
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                          sub.belowCutoff ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {sub.belowCutoff ? '🚨 Below 75% Cutoff' : '✓ Compliant'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Weekly Attendance Trend */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-bold text-slate-200 mb-2">Weekly Attendance Trend (Last 8 Wks)</div>
              <div className="h-44 relative">
                <Line data={attendanceTrendData} options={attendanceTrendOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* STREAMS 3 & 4: LMS & ENGAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* STREAM 3: LMS (Login frequency, assignment completion, late submissions) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-indigo-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    3. LMS Data Stream (Moodle REST API)
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Login frequency, assignment completion rate, and submission timeliness
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Weekly Logins</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.lms.loginFrequencyPerWeek} / wk</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Assignment Done</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.lms.assignmentCompletionRate}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Late Submissions</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.lms.lateSubmissionsCount}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Video Watch Hrs</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.lms.videoWatchHours} hrs</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Last Active Recency</div>
                <div className={`text-xl font-black font-mono mt-1 ${activeStudent.lms.lastActiveDaysAgo > 7 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {activeStudent.lms.lastActiveDaysAgo} d ago
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Forum Posts</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.lms.forumInteractions}</div>
              </div>
            </div>
          </div>

          {/* STREAM 4: ENGAGEMENT (Events, clubs, hackathons, certifications) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    4. Engagement Stream (Campus Activities)
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Campus events, technical clubs, hackathon wins, and industry certs
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Events Attended</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.engagement.campusEventsAttended}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Hackathons</div>
                <div className="text-xl font-black font-mono text-white mt-1">{activeStudent.engagement.hackathonsParticipated} ({activeStudent.engagement.hackathonWins} Wins)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Leadership</div>
                <div className="text-sm font-bold text-indigo-300 mt-2 line-clamp-1">{activeStudent.engagement.leadershipRoles}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-slate-300 mb-1.5">Technical Clubs:</div>
                <div className="flex flex-wrap gap-1">
                  {activeStudent.engagement.technicalClubs?.length > 0 ? (
                    activeStudent.engagement.technicalClubs.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px]">
                        {c}
                      </span>
                    ))
                  ) : <span className="text-slate-500 italic">No clubs recorded</span>}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-slate-300 mb-1.5">Verified Certifications:</div>
                <div className="flex flex-wrap gap-1">
                  {activeStudent.engagement.certifications?.length > 0 ? (
                    activeStudent.engagement.certifications.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]">
                        {c}
                      </span>
                    ))
                  ) : <span className="text-slate-500 italic">No certs on file</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STREAMS 5, 6 & 7: PLACEMENT, SKILLS, FEEDBACK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* STREAM 5: PLACEMENT (Aptitude, coding score, mock interviews) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white">5. Placement Stream</h4>
                <span className="text-[11px] text-slate-400">Aptitude, coding rating & mock interviews</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Coding Assessment</span>
                <span className="font-mono font-bold text-base text-white">{activeStudent.placement.codingScore} / 100</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Aptitude Percentile</span>
                <span className="font-mono font-bold text-base text-white">{activeStudent.placement.aptitudeScore} %</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Mock Interview Score</span>
                <span className="font-mono font-bold text-base text-white">{activeStudent.placement.mockInterviewScore} / 100</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Resume ATS Score</span>
                <span className="font-mono font-bold text-base text-white">{activeStudent.placement.resumeScore} / 100</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs">
              <div className="text-slate-400 text-[10px]">Tier Eligibility:</div>
              <div className="font-bold text-amber-300 mt-0.5">{activeStudent.placement.tierEligibility}</div>
            </div>
          </div>

          {/* STREAM 6: SKILLS (Technical and soft-skill assessments) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-sm font-bold text-white">6. Skills Diagnostic Stream</h4>
                <span className="text-[11px] text-slate-400">Technical & Soft-Skill Assessments</span>
              </div>
            </div>

            <div className="h-44 relative">
              <Radar data={skillsData} options={skillsRadarOptions} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">DSA:</span>
                <span className="font-mono font-bold text-white">{activeStudent.skills.technical.dsa}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Web/Cloud:</span>
                <span className="font-mono font-bold text-white">{activeStudent.skills.technical.webCloud}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Comm:</span>
                <span className="font-mono font-bold text-white">{activeStudent.skills.soft.communication}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Teamwork:</span>
                <span className="font-mono font-bold text-white">{activeStudent.skills.soft.teamwork}%</span>
              </div>
            </div>
          </div>

          {/* STREAM 7: FEEDBACK (Student satisfaction, faculty feedback) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <HeartHandshake className="w-5 h-5 text-rose-400" />
              <div>
                <h4 className="text-sm font-bold text-white">7. Feedback & Wellbeing Stream</h4>
                <span className="text-[11px] text-slate-400">Student satisfaction & faculty observations</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">Satisfaction</div>
                <div className="text-base font-black text-white mt-1">{activeStudent.feedback.studentSatisfaction} / 5.0 ⭐</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">Stress Index</div>
                <div className={`text-base font-black mt-1 ${
                  activeStudent.feedback.stressLevel === 'High' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {activeStudent.feedback.stressLevel}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">Faculty Proctor Observations:</div>
              {activeStudent.feedback.facultyFeedbackNotes?.map((note, i) => (
                <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-relaxed">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHAT-IF SCENARIO SIMULATOR FOR THIS STUDENT */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-sm font-bold text-white">
                Interactive What-If Scenario Simulator for {activeStudent.name}
              </h4>
              <p className="text-xs text-slate-400">
                Model academic & attendance interventions to project real-time score jumps and risk mitigations
              </p>
            </div>
          </div>
          <button
            onClick={resetSimulation}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset Levers
          </button>
        </div>

        {/* Projected Score Impact Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Current Score</div>
            <div className="text-3xl font-black font-mono text-slate-300">{score}</div>
            <div className="text-xs text-rose-400 font-bold">{risks.riskBadge}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              simulation.scoreDelta >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {simulation.scoreDelta >= 0 ? `+${simulation.scoreDelta} Points Jump` : `${simulation.scoreDelta} Points`}
            </div>
            <span className="text-[10px] text-slate-500 mt-1">➔ Transition: {simulation.riskTransition}</span>
          </div>

          <div>
            <div className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Projected Success Score
            </div>
            <div className="text-4xl font-black font-mono text-emerald-400">{simulation.newMetrics.compositeScore}</div>
            <div className="text-xs text-emerald-300 font-bold">{simulation.newMetrics.risks.riskBadge}</div>
          </div>
        </div>

        {/* Interactive Simulation Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Attendance Slider */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Lecture Attendance Lever</span>
              <span className="font-mono text-indigo-300 font-bold">
                {simulation.simulatedStudent.attendance.overall.toFixed(1)}% ({attendanceDelta >= 0 ? `+${attendanceDelta}%` : `${attendanceDelta}%`})
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="30"
              step="1"
              value={attendanceDelta}
              onChange={(e) => setAttendanceDelta(parseInt(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Backlog Clearance */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-300 font-medium">Clear Backlogs in Remedial</span>
              <div className="text-[10px] text-slate-500">Target 0 course backlogs</div>
            </div>
            <button
              onClick={() => setBacklogsOverride(backlogsOverride === 0 ? activeStudent.academic.backlogs : 0)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                backlogsOverride === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {backlogsOverride === 0 ? '✓ Cleared' : `${activeStudent.academic.backlogs} Backlogs`}
            </button>
          </div>

          {/* Coding Bootcamp */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Placement Bootcamp Lever</span>
              <span className="font-mono text-indigo-300 font-bold">
                {simulation.simulatedStudent.placement.codingScore}/100 (+{codingDelta} pts)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="1"
              value={codingDelta}
              onChange={(e) => setCodingDelta(parseInt(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* AI PRESCRIPTIVE INTERVENTION & EMAIL DRAFT */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-sm font-bold text-white">
                Prescriptive AI Action Plan & Automated Notice Generator
              </h4>
              <p className="text-xs text-slate-400">
                Pre-drafted individualized intervention ready for immediate dispatch to student and proctor
              </p>
            </div>
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Action Notice'}</span>
          </button>
        </div>

        <textarea
          value={studentEmailDraft}
          readOnly
          rows={7}
          className="w-full p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
