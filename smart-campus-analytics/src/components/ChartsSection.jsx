import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Doughnut, Scatter, Bar, Radar } from 'react-chartjs-2';
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  Target, 
  Layers, 
  HelpCircle,
  BarChart3,
  Compass
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartsSection({ students, onSelectStudent }) {
  const [activeChartTab, setActiveChartTab] = useState('quadrant'); // 'quadrant', 'breakdown', 'departments', 'radar'

  // Data processing for Doughnut Chart (Risk Distribution)
  const critical = students.filter(s => s.metrics.risks.overall === 'Critical').length;
  const warning = students.filter(s => s.metrics.risks.overall === 'Warning').length;
  const onTrack = students.filter(s => s.metrics.risks.overall === 'On Track').length;
  const champions = students.filter(s => s.metrics.risks.overall === 'Exemplary').length;

  const doughnutData = {
    labels: ['Critical Risk (<60 SSS)', 'Early Warning (60-72)', 'On Track (73-87)', 'Champions (88-100)'],
    datasets: [
      {
        data: [critical, warning, onTrack, champions],
        backgroundColor: [
          'rgba(244, 63, 94, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(99, 102, 241, 0.85)'
        ],
        borderColor: [
          '#f43f5e',
          '#f59e0b',
          '#10b981',
          '#6366f1'
        ],
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5e1',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
          padding: 14,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} Students (${Math.round((ctx.raw / (students.length || 1)) * 100)}%)`
        }
      }
    },
    cutout: '68%'
  };

  // Data processing for Scatter Plot (Attendance vs CGPA Quadrant)
  const scatterPoints = students.map(s => ({
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
          const raw = ctx.raw;
          if (!raw) return '#6366f1';
          const r = raw.student?.metrics?.risks?.overall;
          if (r === 'Critical') return '#f43f5e';
          if (r === 'Warning') return '#f59e0b';
          if (r === 'Exemplary') return '#818cf8';
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
          text: 'Overall Attendance (%) — 75% Statutory Cutoff',
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
        padding: 12,
        callbacks: {
          title: (items) => {
            const raw = items[0]?.raw;
            return raw ? `${raw.student.name} (${raw.student.usn})` : '';
          },
          label: (item) => {
            const s = item.raw.student;
            return [
              `Dept: ${s.department}`,
              `Attendance: ${item.raw.x}%`,
              `CGPA: ${item.raw.y.toFixed(2)}`,
              `Success Score: ${s.metrics.compositeScore}/100`,
              `Risk Status: ${s.metrics.risks.overall}`
            ];
          }
        }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index;
        const student = scatterPoints[idx]?.student;
        if (student && onSelectStudent) {
          onSelectStudent(student);
        }
      }
    }
  };

  // Department Benchmark Bar Chart
  const depts = ['Computer Science & Engineering', 'AI & Data Science', 'Electronics & Communication'];
  const deptLabels = ['CSE', 'AI & DS', 'ECE'];
  
  const deptAvgScores = depts.map(d => {
    const subset = students.filter(s => s.department === d);
    if (!subset.length) return 75;
    return Math.round(subset.reduce((acc, s) => acc + s.metrics.compositeScore, 0) / subset.length);
  });

  const deptAvgAttendance = depts.map(d => {
    const subset = students.filter(s => s.department === d);
    if (!subset.length) return 80;
    return Math.round(subset.reduce((acc, s) => acc + s.attendance.overall, 0) / subset.length);
  });

  const deptAvgPlacement = depts.map(d => {
    const subset = students.filter(s => s.department === d);
    if (!subset.length) return 70;
    return Math.round(subset.reduce((acc, s) => acc + s.placement.codingScore, 0) / subset.length);
  });

  const barData = {
    labels: deptLabels,
    datasets: [
      {
        label: 'Success Score (SSS)',
        data: deptAvgScores,
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 6
      },
      {
        label: 'Attendance Avg (%)',
        data: deptAvgAttendance,
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 6
      },
      {
        label: 'Coding Assessment Avg (%)',
        data: deptAvgPlacement,
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
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true }
      }
    }
  };

  // 7 Pillar Campus Health Radar
  const pillarAverages = {
    academic: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.academic, 0) / (students.length || 1)),
    attendance: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.attendance, 0) / (students.length || 1)),
    placement: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.placement, 0) / (students.length || 1)),
    lms: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.lms, 0) / (students.length || 1)),
    skills: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.skills, 0) / (students.length || 1)),
    engagement: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.engagement, 0) / (students.length || 1)),
    feedback: Math.round(students.reduce((a, s) => a + s.metrics.pillarScores.feedback, 0) / (students.length || 1))
  };

  const radarData = {
    labels: ['Academic', 'Attendance (75%)', 'Placement', 'LMS Activity', 'Skills (Tech/Soft)', 'Campus Engagement', 'Wellbeing/Feedback'],
    datasets: [
      {
        label: 'Campus Institutional Average',
        data: [
          pillarAverages.academic,
          pillarAverages.attendance,
          pillarAverages.placement,
          pillarAverages.lms,
          pillarAverages.skills,
          pillarAverages.engagement,
          pillarAverages.feedback
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#6366f1',
        borderWidth: 2
      },
      {
        label: 'Target Accreditation Benchmark (NAAC/ABET)',
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
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true }
      }
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-xl my-6">
      {/* Chart Header & Mode Toggle Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Predictive Campus Analytics & Risk Visualizations
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time correlation across attendance, academic thresholds, and placement readiness
          </p>
        </div>

        {/* Chart View Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveChartTab('quadrant')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeChartTab === 'quadrant'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Attendance vs CGPA Quadrant
          </button>
          <button
            onClick={() => setActiveChartTab('breakdown')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeChartTab === 'breakdown'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Category Pie
          </button>
          <button
            onClick={() => setActiveChartTab('departments')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeChartTab === 'departments'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Department Benchmarks
          </button>
          <button
            onClick={() => setActiveChartTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeChartTab === 'radar'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            7-Pillar Campus Radar
          </button>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="pt-4 h-[340px] relative">
        {activeChartTab === 'quadrant' && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Critical Risk
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ml-2"></span> Warning
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ml-2"></span> On Track
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block ml-2"></span> Star
              </span>
              <span className="text-[11px] text-indigo-300 font-mono">
                💡 Click any dot on chart to open student dossier
              </span>
            </div>
            <div className="flex-1 relative">
              <Scatter data={scatterData} options={scatterOptions} />
            </div>
          </div>
        )}

        {activeChartTab === 'breakdown' && (
          <div className="h-full flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="h-full w-full md:w-1/2 relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 pr-4">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="text-xs font-semibold text-slate-200">Critical Intervention Tier</span>
                </div>
                <span className="text-sm font-extrabold text-rose-400">{critical} Students ({Math.round((critical / students.length) * 100)}%)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-semibold text-slate-200">Early Warning (Actionable)</span>
                </div>
                <span className="text-sm font-extrabold text-amber-400">{warning} Students ({Math.round((warning / students.length) * 100)}%)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-slate-200">On Track / Healthy Standing</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-400">{onTrack} Students ({Math.round((onTrack / students.length) * 100)}%)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-semibold text-slate-200">Campus Champions (Tier 1 Ready)</span>
                </div>
                <span className="text-sm font-extrabold text-indigo-400">{champions} Students ({Math.round((champions / students.length) * 100)}%)</span>
              </div>
            </div>
          </div>
        )}

        {activeChartTab === 'departments' && (
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
  );
}
