import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  Briefcase, 
  Clock, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  SlidersHorizontal, 
  Download, 
  Printer, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  BarChart3,
  Layers,
  Send
} from 'lucide-react';
import { Doughnut, Scatter, Bar, Radar } from 'react-chartjs-2';

export default function FacultyAdminDashboard({ 
  students, 
  onSelectStudent, 
  onOpenIntervention, 
  onOpenSimulator 
}) {
  const [adminRole, setAdminRole] = useState('dean'); // 'dean' (Dean/Admin) or 'faculty' (Faculty Proctor)
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSem, setSelectedSem] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL'); // 'ALL', 'ACADEMIC_RISK', 'PLACEMENT_RISK', 'ATTENDANCE_RISK', 'CRITICAL'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChartTab, setActiveChartTab] = useState('quadrant'); // 'quadrant', 'riskPie', 'deptBar', 'radar'

  // Filter students based on role, department, semester, search, and risk
  const filteredStudents = students.filter(student => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = student.name.toLowerCase().includes(q) || student.usn.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Department
    if (selectedDept !== 'ALL' && student.department !== selectedDept) return false;

    // Semester
    if (selectedSem !== 'ALL' && student.semester.toString() !== selectedSem) return false;

    // Risk Filter
    if (riskFilter === 'ACADEMIC_RISK') {
      if (student.metrics.risks.academic !== 'High') return false;
    } else if (riskFilter === 'PLACEMENT_RISK') {
      if (student.metrics.risks.placement !== 'High') return false;
    } else if (riskFilter === 'ATTENDANCE_RISK') {
      if (student.attendance.overall >= 75) return false;
    } else if (riskFilter === 'CRITICAL') {
      if (student.metrics.risks.overall !== 'Critical') return false;
    }

    return true;
  });

  // Calculate Key Summary Indicators
  const totalStudents = students.length;
  const avgSuccessScore = Math.round(
    students.reduce((acc, s) => acc + s.metrics.compositeScore, 0) / (totalStudents || 1)
  );
  
  // Risk counts
  const poorAcademicCount = students.filter(s => s.metrics.risks.academic === 'High').length;
  const poorPlacementCount = students.filter(s => s.metrics.risks.placement === 'High').length;
  const attendanceDebarmentCount = students.filter(s => s.attendance.overall < 75).length;
  const criticalCount = students.filter(s => s.metrics.risks.overall === 'Critical').length;
  const championsCount = students.filter(s => s.metrics.risks.overall === 'Exemplary').length;

  // Chart 1: Donut Chart (Risk Breakdown)
  const doughnutData = {
    labels: ['Critical Risk (<60 SSS)', 'Early Warning (60-72)', 'On Track (73-87)', 'Champions (88-100)'],
    datasets: [
      {
        data: [
          criticalCount,
          students.filter(s => s.metrics.risks.overall === 'Warning').length,
          students.filter(s => s.metrics.risks.overall === 'On Track').length,
          championsCount
        ],
        backgroundColor: [
          'rgba(244, 63, 94, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(99, 102, 241, 0.85)'
        ],
        borderColor: ['#f43f5e', '#f59e0b', '#10b981', '#6366f1'],
        borderWidth: 2
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true }
      }
    },
    cutout: '70%'
  };

  // Chart 2: Attendance vs CGPA Scatter Quadrant
  const scatterPoints = filteredStudents.map(s => ({
    x: s.attendance.overall,
    y: s.academic.cgpa,
    student: s
  }));

  const scatterData = {
    datasets: [
      {
        label: 'Students',
        data: scatterPoints,
        backgroundColor: (ctx) => {
          const raw = ctx.raw?.student;
          if (!raw) return '#6366f1';
          if (raw.metrics.risks.overall === 'Critical') return '#f43f5e';
          if (raw.metrics.risks.overall === 'Warning') return '#f59e0b';
          if (raw.metrics.risks.overall === 'Exemplary') return '#818cf8';
          return '#10b981';
        },
        borderColor: '#0f172a',
        borderWidth: 1.5,
        pointRadius: 6,
        pointHoverRadius: 9
      }
    ]
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Attendance % (75% Statutory Cutoff)',
          color: '#94a3b8',
          font: { size: 11, weight: '600' }
        },
        min: 50,
        max: 100,
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b' }
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative GPA (CGPA / 10.0)',
          color: '#94a3b8',
          font: { size: 11, weight: '600' }
        },
        min: 4.5,
        max: 10.0,
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        callbacks: {
          title: (items) => items[0]?.raw?.student?.name || '',
          label: (item) => {
            const s = item.raw.student;
            return [
              `USN: ${s.usn}`,
              `CGPA: ${s.academic.cgpa.toFixed(2)} | Att: ${s.attendance.overall}%`,
              `Success Score: ${s.metrics.compositeScore}/100`,
              `Risk: ${s.metrics.risks.overall}`
            ];
          }
        }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index;
        const student = scatterPoints[idx]?.student;
        if (student && onSelectStudent) onSelectStudent(student);
      }
    }
  };

  // Chart 3: Department Comparison Bar Chart
  const deptLabels = ['CSE', 'AI & DS', 'ECE'];
  const depts = ['Computer Science & Engineering', 'AI & Data Science', 'Electronics & Communication'];
  
  const barData = {
    labels: deptLabels,
    datasets: [
      {
        label: 'Success Score (SSS Avg)',
        data: depts.map(d => {
          const sub = students.filter(s => s.department === d);
          return sub.length ? Math.round(sub.reduce((a, s) => a + s.metrics.compositeScore, 0) / sub.length) : 75;
        }),
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 6
      },
      {
        label: 'Attendance Avg (%)',
        data: depts.map(d => {
          const sub = students.filter(s => s.department === d);
          return sub.length ? Math.round(sub.reduce((a, s) => a + s.attendance.overall, 0) / sub.length) : 80;
        }),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 6
      },
      {
        label: 'Coding Assessment Avg (%)',
        data: depts.map(d => {
          const sub = students.filter(s => s.department === d);
          return sub.length ? Math.round(sub.reduce((a, s) => a + s.placement.codingScore, 0) / sub.length) : 68;
        }),
        backgroundColor: 'rgba(245, 158, 11, 0.85)',
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
      y: { min: 40, max: 100, grid: { color: '#1e293b' }, ticks: { color: '#64748b' } }
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true } }
    }
  };

  // Chart 4: Campus 7-Pillar Benchmark Radar
  const radarData = {
    labels: ['Academic', 'Attendance (75%)', 'Placement', 'LMS Activity', 'Skills', 'Engagement', 'Feedback'],
    datasets: [
      {
        label: 'Current Campus Average',
        data: [
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.academic, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.attendance, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.placement, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.lms, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.skills, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.engagement, 0) / (totalStudents || 1)),
          Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.feedback, 0) / (totalStudents || 1))
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        borderWidth: 2
      },
      {
        label: 'Accreditation Target (NAAC/ABET)',
        data: [80, 85, 75, 80, 75, 70, 80],
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        borderColor: 'rgba(16, 185, 129, 0.6)',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 2
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#1e293b' },
        grid: { color: '#1e293b' },
        pointLabels: { color: '#94a3b8', font: { size: 10, weight: '600' } },
        ticks: { color: '#64748b', backdropColor: 'transparent', stepSize: 20 },
        suggestedMin: 30,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true } }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Role Switcher */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider font-mono">
              Administrative Command Center
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">
              Interactive Dashboard for Faculty & Administrators
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time decision intelligence: Monitor Student Success Scores, identify multi-dimensional risk flags (poor academic performance & placement vulnerability), track key campus trends, and execute data-driven interventions.
          </p>
        </div>

        {/* Role Toggle Switcher */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setAdminRole('dean')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              adminRole === 'dean' ? 'bg-indigo-600 text-white shadow font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Dean / Administrator View</span>
          </button>
          <button
            onClick={() => setAdminRole('faculty')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              adminRole === 'faculty' ? 'bg-indigo-600 text-white shadow font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Faculty Proctor View</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE KPI CARDS: SUCCESS SCORES & RISK FLAGS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. Institutional Student Success Score */}
        <div 
          onClick={() => setRiskFilter('ALL')}
          className={`p-4 rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent bg-slate-900/60 border border-slate-800 backdrop-blur-xl cursor-pointer transition hover:scale-[1.01] ${
            riskFilter === 'ALL' ? 'ring-2 ring-indigo-400' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Student Success Score</span>
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          </div>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {avgSuccessScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +3.8 pts vs prev term
          </div>
          <div className="text-[10px] text-slate-400 mt-2">Campus Baseline: 72.0</div>
        </div>

        {/* 2. Poor Academic Performance Risk Flag */}
        <div 
          onClick={() => setRiskFilter(riskFilter === 'ACADEMIC_RISK' ? 'ALL' : 'ACADEMIC_RISK')}
          className={`p-4 rounded-2xl bg-gradient-to-b from-rose-500/10 to-transparent bg-slate-900/60 border border-slate-800 backdrop-blur-xl cursor-pointer transition hover:scale-[1.01] ${
            riskFilter === 'ACADEMIC_RISK' ? 'ring-2 ring-rose-400' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-300 mb-1 font-semibold">
            <span>Poor Academic Risk</span>
            <BookOpen className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black font-mono text-rose-400 mt-1">
            {poorAcademicCount}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-1">
            Backlogs ≥ 1 or CGPA &lt; 6.0
          </div>
          <div className="text-[10px] text-rose-400 mt-2 font-bold">
            {riskFilter === 'ACADEMIC_RISK' ? '✓ Filter active' : 'Click to filter list'}
          </div>
        </div>

        {/* 3. Poor Placement Outcomes Risk Flag */}
        <div 
          onClick={() => setRiskFilter(riskFilter === 'PLACEMENT_RISK' ? 'ALL' : 'PLACEMENT_RISK')}
          className={`p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent bg-slate-900/60 border border-slate-800 backdrop-blur-xl cursor-pointer transition hover:scale-[1.01] ${
            riskFilter === 'PLACEMENT_RISK' ? 'ring-2 ring-amber-400' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-300 mb-1 font-semibold">
            <span>Poor Placement Risk</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-400 mt-1">
            {poorPlacementCount}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-1">
            Coding &lt; 55 or Aptitude &lt; 55
          </div>
          <div className="text-[10px] text-amber-400 mt-2 font-bold">
            {riskFilter === 'PLACEMENT_RISK' ? '✓ Filter active' : 'Click to filter list'}
          </div>
        </div>

        {/* 4. Attendance Debarment Risk (<75% Cutoff) */}
        <div 
          onClick={() => setRiskFilter(riskFilter === 'ATTENDANCE_RISK' ? 'ALL' : 'ATTENDANCE_RISK')}
          className={`p-4 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent bg-slate-900/60 border border-slate-800 backdrop-blur-xl cursor-pointer transition hover:scale-[1.01] ${
            riskFilter === 'ATTENDANCE_RISK' ? 'ring-2 ring-orange-400' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-orange-300 mb-1 font-semibold">
            <span>&lt;75% Attendance Alert</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black font-mono text-orange-400 mt-1">
            {attendanceDebarmentCount}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-1">
            Statutory AICTE cutoff breached
          </div>
          <div className="text-[10px] text-orange-400 mt-2 font-bold">
            {riskFilter === 'ATTENDANCE_RISK' ? '✓ Filter active' : 'Click to filter list'}
          </div>
        </div>

        {/* 5. Campus Champions (Top Performers) */}
        <div 
          onClick={() => setRiskFilter(riskFilter === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
          className={`p-4 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent bg-slate-900/60 border border-slate-800 backdrop-blur-xl cursor-pointer transition hover:scale-[1.01] ${
            riskFilter === 'CRITICAL' ? 'ring-2 ring-purple-400' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-purple-300 mb-1 font-semibold">
            <span>Critical Multi-Risk</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black font-mono text-rose-400 mt-1">
            {criticalCount}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-1">
            Immediate retention alert
          </div>
          <div className="text-[10px] text-purple-400 mt-2 font-bold">
            {riskFilter === 'CRITICAL' ? '✓ Filter active' : 'Click to filter list'}
          </div>
        </div>
      </div>

      {/* KEY TRENDS & ANALYTICS VISUALIZATIONS */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Key Campus Trends & Multi-Pillar Visualizations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Correlations across attendance thresholds, academic GPAs, department benchmarks, and risk tiers
            </p>
          </div>

          {/* Visual Mode Buttons */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveChartTab('quadrant')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'quadrant' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Attendance vs CGPA Quadrant
            </button>
            <button
              onClick={() => setActiveChartTab('riskPie')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'riskPie' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Risk Flags Donut
            </button>
            <button
              onClick={() => setActiveChartTab('deptBar')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'deptBar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Department Benchmarks
            </button>
            <button
              onClick={() => setActiveChartTab('radar')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'radar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              7-Pillar Campus Radar
            </button>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="h-[320px] relative pt-2">
          {activeChartTab === 'quadrant' && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-2 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Critical Risk
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ml-2"></span> Warning
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ml-2"></span> On Track
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block ml-2"></span> Champions
                </span>
                <span className="text-indigo-400 font-mono text-[11px]">
                  💡 Click any dot to open individual student dossier
                </span>
              </div>
              <div className="flex-1 relative">
                <Scatter data={scatterData} options={scatterOptions} />
              </div>
            </div>
          )}

          {activeChartTab === 'riskPie' && (
            <div className="h-full flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="h-full w-full md:w-1/2 relative flex items-center justify-center">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center gap-2.5 pr-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="font-bold text-slate-200">Critical Retention Tier</span>
                  </div>
                  <span className="font-mono font-bold text-rose-400">{criticalCount} Students ({Math.round((criticalCount / totalStudents) * 100)}%)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="font-bold text-slate-200">Early Warning (Actionable)</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400">
                    {students.filter(s => s.metrics.risks.overall === 'Warning').length} Students
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-200">On Track / Good Standing</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">
                    {students.filter(s => s.metrics.risks.overall === 'On Track').length} Students
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                    <span className="font-bold text-slate-200">Campus Champions (Tier 1 Ready)</span>
                  </div>
                  <span className="font-mono font-bold text-indigo-400">{championsCount} Students</span>
                </div>
              </div>
            </div>
          )}

          {activeChartTab === 'deptBar' && (
            <div className="h-full">
              <Bar data={barData} options={barOptions} />
            </div>
          )}

          {activeChartTab === 'radar' && (
            <div className="h-full">
              <Radar data={radarData} options={radarOptions} />
            </div>
          )}
        </div>
      </div>

      {/* RELEVANT STUDENT INSIGHTS & AT-RISK ACTION ROSTER */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
        {/* Controls: Search & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Relevant Student Insights & Intervention Roster ({filteredStudents.length} Students)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Faculty and administrators can review root drivers and trigger immediate 1-click targeted actions
            </p>
          </div>

          {/* Slicing Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name / USN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Department */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="AI & Data Science">AI & DS</option>
              <option value="Electronics & Communication">ECE</option>
            </select>

            {/* Semester */}
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Semesters</option>
              <option value="5">Sem 5</option>
              <option value="7">Sem 7</option>
            </select>

            {/* Reset */}
            {(selectedDept !== 'ALL' || selectedSem !== 'ALL' || riskFilter !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('ALL');
                  setSelectedSem('ALL');
                  setRiskFilter('ALL');
                  setSearchQuery('');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Student Insights Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Student Profile</th>
                <th className="py-3 px-2">Success Score</th>
                <th className="py-3 px-2">Academic (CGPA)</th>
                <th className="py-3 px-2">Attendance (75%)</th>
                <th className="py-3 px-2">Placement / Coding</th>
                <th className="py-3 px-3">Relevant Root Insight</th>
                <th className="py-3 px-3 text-right">Action Interventions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
              {filteredStudents.map((student) => {
                const score = student.metrics.compositeScore;
                const isCrit = student.metrics.risks.overall === 'Critical';
                const isWarn = student.metrics.risks.overall === 'Warning';
                const isBelowAtt = student.attendance.overall < 75;

                return (
                  <tr 
                    key={student.id}
                    onClick={() => onSelectStudent(student)}
                    className="hover:bg-slate-800/40 transition cursor-pointer group"
                  >
                    {/* Profile */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-indigo-300 transition">
                            {student.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {student.usn} • Sem {student.semester}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SSS Score */}
                    <td className="py-3 px-2 font-mono">
                      <span className={`px-2 py-0.5 rounded-lg font-black text-xs ${
                        score >= 88 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        score >= 73 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        score >= 60 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                      }`}>
                        {score}
                      </span>
                    </td>

                    {/* CGPA */}
                    <td className="py-3 px-2">
                      <div className="font-semibold text-white">{student.academic.cgpa.toFixed(2)} CGPA</div>
                      {student.academic.backlogs > 0 ? (
                        <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1 rounded">
                          {student.academic.backlogs} Backlog(s)
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400">0 Backlogs</span>
                      )}
                    </td>

                    {/* Attendance */}
                    <td className="py-3 px-2">
                      <div className={`font-semibold ${isBelowAtt ? 'text-rose-400 font-bold' : 'text-slate-200'}`}>
                        {student.attendance.overall}%
                      </div>
                      {isBelowAtt ? (
                        <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1 rounded">
                          🚨 &lt;75% Cutoff
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400">AICTE OK</span>
                      )}
                    </td>

                    {/* Placement */}
                    <td className="py-3 px-2">
                      <div className="font-semibold text-white">{student.placement.codingScore}/100</div>
                      <span className="text-[10px] text-slate-400">{student.placement.tierEligibility}</span>
                    </td>

                    {/* Relevant Insight */}
                    <td className="py-3 px-3 max-w-xs">
                      <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {student.explanation.narrative}
                      </div>
                    </td>

                    {/* Action Triggers */}
                    <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Open Full 360° Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenIntervention(student)}
                          className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition"
                          title="Dispatch AI Intervention & Action Notice"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenSimulator(student)}
                          className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition"
                          title="Launch What-If Simulator"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
