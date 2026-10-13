import React from 'react';
import { 
  Users, 
  Award, 
  AlertOctagon, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';

export default function OverviewKPIs({ students, activeRiskFilter, setActiveRiskFilter }) {
  const total = students.length;
  
  // Computations
  const avgSuccessScore = Math.round(
    students.reduce((acc, s) => acc + s.metrics.compositeScore, 0) / (total || 1)
  );

  const avgAttendance = (
    students.reduce((acc, s) => acc + s.attendance.overall, 0) / (total || 1)
  ).toFixed(1);

  const criticalCount = students.filter(s => s.metrics.risks.overall === 'Critical').length;
  const warningCount = students.filter(s => s.metrics.risks.overall === 'Warning').length;
  const academicRiskCount = students.filter(s => s.metrics.risks.academic === 'High').length;
  const placementRiskCount = students.filter(s => s.metrics.risks.placement === 'High').length;
  const attendanceBelowCutoff = students.filter(s => s.attendance.overall < 75).length;
  const championCount = students.filter(s => s.metrics.risks.overall === 'Exemplary').length;

  const kpis = [
    {
      id: 'total',
      title: 'Monitored Cohort',
      value: total,
      unit: 'Students',
      subtext: '4 Departments • Sems 5 & 7',
      icon: Users,
      color: 'indigo',
      filterValue: 'ALL',
      badge: 'Active Census'
    },
    {
      id: 'score',
      title: 'Campus Success Score (SSS)',
      value: avgSuccessScore,
      unit: '/100',
      subtext: '+3.8 pts vs previous semester',
      icon: Award,
      color: 'emerald',
      filterValue: 'ALL',
      badge: avgSuccessScore >= 75 ? 'Healthy Benchmark' : 'Attention Needed'
    },
    {
      id: 'critical',
      title: 'Critical Retention Risk',
      value: criticalCount,
      unit: 'Urgent',
      subtext: `${((criticalCount / total) * 100).toFixed(0)}% of cohort in critical zone`,
      icon: AlertOctagon,
      color: 'rose',
      filterValue: 'Critical',
      badge: 'Immediate Action',
      pulse: criticalCount > 0
    },
    {
      id: 'placement',
      title: 'Placement Vulnerable',
      value: placementRiskCount,
      unit: 'Flagged',
      subtext: 'High CGPA but Coding/Aptitude gap',
      icon: Briefcase,
      color: 'amber',
      filterValue: 'PLACEMENT_VULNERABLE',
      badge: 'Boot Camp Target'
    },
    {
      id: 'attendance',
      title: 'Below 75% Attendance',
      value: attendanceBelowCutoff,
      unit: 'Students',
      subtext: 'Breaching statutory AICTE limit',
      icon: Clock,
      color: 'orange',
      filterValue: 'ATTENDANCE_CRITICAL',
      badge: 'Debarment Notice'
    },
    {
      id: 'champions',
      title: 'Campus Champions',
      value: championCount,
      unit: 'Star Achievers',
      subtext: 'Tier 1 Super Dream & GDSC Leads',
      icon: TrendingUp,
      color: 'purple',
      filterValue: 'Exemplary',
      badge: 'Placement Ready'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 my-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isSelected = activeRiskFilter === kpi.filterValue;

        // Color maps
        const colorStyles = {
          indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40',
          emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40',
          rose: 'from-rose-500/10 to-rose-600/5 border-rose-500/20 text-rose-400 hover:border-rose-500/40',
          amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400 hover:border-amber-500/40',
          orange: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 text-orange-400 hover:border-orange-500/40',
          purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400 hover:border-purple-500/40'
        }[kpi.color];

        return (
          <div
            key={kpi.id}
            onClick={() => setActiveRiskFilter(isSelected ? 'ALL' : kpi.filterValue)}
            className={`relative p-3.5 rounded-2xl bg-gradient-to-b ${colorStyles} border backdrop-blur-md transition-all duration-300 cursor-pointer group shadow-lg ${
              isSelected ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Top row: Icon & Status Badge */}
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300`}>
                {kpi.badge}
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                {kpi.value}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {kpi.unit}
              </span>
              {kpi.pulse && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping ml-auto"></span>
              )}
            </div>

            {/* Title & Subtext */}
            <div className="mt-1">
              <h3 className="text-xs font-semibold text-slate-200 line-clamp-1">
                {kpi.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {kpi.subtext}
              </p>
            </div>

            {/* Hover indication */}
            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-indigo-300 transition">
              <span>{isSelected ? '✓ Filtering active' : 'Click to filter list'}</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
