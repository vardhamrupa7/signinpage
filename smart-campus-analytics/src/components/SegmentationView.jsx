import React, { useState } from 'react';
import { 
  Trophy, 
  Briefcase, 
  Code, 
  UserX, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  ChevronRight,
  Eye,
  Sparkles,
  SlidersHorizontal,
  Target
} from 'lucide-react';
import { COHORTS, segmentStudents } from '../utils/segmentation';

export default function SegmentationView({ students, onSelectStudent, onOpenIntervention, onOpenSimulator }) {
  const [selectedCohortId, setSelectedCohortId] = useState('ALL');

  const segments = segmentStudents(students);

  const cohortList = [
    { ...COHORTS.CHAMPIONS, count: segments.CHAMPIONS?.length || 0, icon: Trophy, color: 'indigo' },
    { ...COHORTS.PLACEMENT_VULNERABLE, count: segments.PLACEMENT_VULNERABLE?.length || 0, icon: Briefcase, color: 'amber' },
    { ...COHORTS.CODER_ACADEMIC_SLUMP, count: segments.CODER_ACADEMIC_SLUMP?.length || 0, icon: Code, color: 'cyan' },
    { ...COHORTS.DISENGAGED_INACTIVE, count: segments.DISENGAGED_INACTIVE?.length || 0, icon: UserX, color: 'orange' },
    { ...COHORTS.CRITICAL_MULTI_PILLAR, count: segments.CRITICAL_MULTI_PILLAR?.length || 0, icon: AlertTriangle, color: 'rose' }
  ];

  const displayedStudents = selectedCohortId === 'ALL' 
    ? students 
    : segments[selectedCohortId] || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider font-mono">
              Bonus Credit Feature
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">
              Behavioral Student Segmentation & Cohort Clustering
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Moves beyond simple averages. Uses multi-dimensional clustering to group students by behavioral patterns (Academics, Attendance, LMS, Placement, Engagement) so college administrators can execute targeted, high-impact interventions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSelectedCohortId('ALL')}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedCohortId === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Cohorts ({students.length})
          </button>
        </div>
      </div>

      {/* 5 Cohort Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {cohortList.map((cohort) => {
          const Icon = cohort.icon;
          const isSelected = selectedCohortId === cohort.id;

          const cardStyles = {
            indigo: 'hover:border-indigo-500/50 from-indigo-500/10 to-transparent',
            amber: 'hover:border-amber-500/50 from-amber-500/10 to-transparent',
            cyan: 'hover:border-cyan-500/50 from-cyan-500/10 to-transparent',
            orange: 'hover:border-orange-500/50 from-orange-500/10 to-transparent',
            rose: 'hover:border-rose-500/50 from-rose-500/10 to-transparent'
          }[cohort.color];

          return (
            <div
              key={cohort.id}
              onClick={() => setSelectedCohortId(isSelected ? 'ALL' : cohort.id)}
              className={`p-4 rounded-2xl bg-gradient-to-b ${cardStyles} bg-slate-900/60 border border-slate-800 backdrop-blur-xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected ? 'ring-2 ring-indigo-400 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xl font-black text-white">
                    {cohort.count}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {cohort.name}
                </h3>
                <span className="inline-block text-[10px] font-semibold text-slate-400 mt-0.5">
                  {cohort.badge}
                </span>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {cohort.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider mb-1">
                  Targeted Campus Action:
                </div>
                <p className="text-[10px] text-slate-300 line-clamp-2 italic">
                  "{cohort.recommendedAction}"
                </p>
                <div className="flex items-center justify-between mt-2 text-[10px] font-semibold text-slate-400">
                  <span>{isSelected ? '✓ Filter active' : 'Click to filter'}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Cards in Selected Cohort */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Students in {selectedCohortId === 'ALL' ? 'All Cohorts' : COHORTS[selectedCohortId]?.name} ({displayedStudents.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Click student card for full dossier and XAI drivers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer group hover:scale-[1.01] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition"
                    />
                    <div>
                      <div className="font-bold text-white text-xs group-hover:text-indigo-300 transition">
                        {student.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {student.usn} • Sem {student.semester}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black font-mono text-white">
                      {student.metrics.compositeScore}
                    </div>
                    <div className="text-[10px] text-slate-400">Score</div>
                  </div>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 my-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">CGPA</div>
                    <div className="font-bold text-slate-200">{student.academic.cgpa.toFixed(2)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Attendance</div>
                    <div className={`font-bold ${student.attendance.overall < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {student.attendance.overall}%
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Coding</div>
                    <div className="font-bold text-indigo-300">{student.placement.codingScore}/100</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  <strong>Diagnostic Note:</strong> {student.explanation.narrative}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                <span className="font-semibold text-indigo-400 text-[11px]">
                  {student.cohort.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenIntervention(student)}
                    className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 transition"
                    title="AI Intervention Plan"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenSimulator(student)}
                    className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 transition"
                    title="What-If Simulator"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="View 360 Dossier"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
