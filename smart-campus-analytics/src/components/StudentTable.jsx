import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  Sparkles, 
  SlidersHorizontal, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';

export default function StudentTable({ 
  students, 
  onSelectStudent, 
  onOpenIntervention,
  onOpenSimulator,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedSemester,
  setSelectedSemester,
  selectedRisk,
  setSelectedRisk
}) {
  const [sortField, setSortField] = useState('compositeScore'); // 'compositeScore', 'cgpa', 'attendance', 'coding'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter pipeline
  const filteredStudents = students.filter(student => {
    // 1. Search Query (name or USN)
    const matchSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    // 2. Department
    if (selectedDepartment !== 'ALL' && student.department !== selectedDepartment) {
      return false;
    }

    // 3. Semester
    if (selectedSemester !== 'ALL' && student.semester.toString() !== selectedSemester) {
      return false;
    }

    // 4. Risk / Filter presets
    if (selectedRisk !== 'ALL') {
      if (selectedRisk === 'Critical' && student.metrics.risks.overall !== 'Critical') return false;
      if (selectedRisk === 'Warning' && student.metrics.risks.overall !== 'Warning') return false;
      if (selectedRisk === 'On Track' && student.metrics.risks.overall !== 'On Track') return false;
      if (selectedRisk === 'Exemplary' && student.metrics.risks.overall !== 'Exemplary') return false;
      if (selectedRisk === 'PLACEMENT_VULNERABLE' && student.cohort.id !== 'PLACEMENT_VULNERABLE') return false;
      if (selectedRisk === 'ATTENDANCE_CRITICAL' && student.attendance.overall >= 75) return false;
    }

    return true;
  });

  // Sort pipeline
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let valA = 0;
    let valB = 0;

    switch (sortField) {
      case 'compositeScore':
        valA = a.metrics.compositeScore;
        valB = b.metrics.compositeScore;
        break;
      case 'cgpa':
        valA = a.academic.cgpa;
        valB = b.academic.cgpa;
        break;
      case 'attendance':
        valA = a.attendance.overall;
        valB = b.attendance.overall;
        break;
      case 'coding':
        valA = a.placement.codingScore;
        valB = b.placement.codingScore;
        break;
      default:
        valA = a.metrics.compositeScore;
        valB = b.metrics.compositeScore;
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl my-6">
      {/* Controls Bar: Search, Filters, Count */}
      <div className="p-4 border-b border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, USN (e.g. Rohan, 1RV22CS042)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="AI & Data Science">AI & DS</option>
            <option value="Electronics & Communication">ECE</option>
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Semesters</option>
            <option value="5">Semester 5 (3rd Year)</option>
            <option value="7">Semester 7 (Final Year)</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Risk Statuses</option>
            <option value="Critical">🚨 Critical Intervention Required</option>
            <option value="Warning">⚠️ Early Warning</option>
            <option value="On Track">✅ On Track</option>
            <option value="Exemplary">🏆 Campus Champions</option>
            <option value="PLACEMENT_VULNERABLE">💼 Placement Vulnerable</option>
            <option value="ATTENDANCE_CRITICAL">⏱️ Below 75% Attendance</option>
          </select>

          {/* Reset Filters button if any is active */}
          {(selectedDepartment !== 'ALL' || selectedSemester !== 'ALL' || selectedRisk !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDepartment('ALL');
                setSelectedSemester('ALL');
                setSelectedRisk('ALL');
                setSearchQuery('');
              }}
              className="px-2.5 py-2 text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {/* Showing count */}
        <div className="text-xs text-slate-400 font-mono self-end lg:self-center">
          Showing <span className="text-white font-bold">{sortedStudents.length}</span> of {students.length}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 text-[10px]">
            <tr>
              <th className="py-3 px-4">Student Profile</th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('compositeScore')}>
                <div className="flex items-center gap-1">
                  <span>Success Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('cgpa')}>
                <div className="flex items-center gap-1">
                  <span>Academic (CGPA)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('attendance')}>
                <div className="flex items-center gap-1">
                  <span>Attendance (75%)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('coding')}>
                <div className="flex items-center gap-1">
                  <span>Placement / Coding</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Behavioral Cohort (Bonus)</th>
              <th className="py-3 px-3">Risk Assessment</th>
              <th className="py-3 px-4 text-right">Action Interventions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedStudents.map((student) => {
              const score = student.metrics.compositeScore;
              const overallRisk = student.metrics.risks.overall;
              const isBelow75 = student.attendance.overall < 75;

              // Color badge styling
              const riskTagStyles = {
                Critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
                Warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                'On Track': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                Exemplary: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
              }[overallRisk] || 'bg-slate-700 text-slate-300';

              return (
                <tr 
                  key={student.id} 
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectStudent(student)}
                >
                  {/* Student Profile Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition"
                      />
                      <div>
                        <div className="font-bold text-white text-xs group-hover:text-indigo-300 transition">
                          {student.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {student.usn} • Sem {student.semester} ({student.department.split(' ')[0]})
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Success Score Badge */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs font-mono shadow ${
                        score >= 88 ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' :
                        score >= 73 ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' :
                        score >= 60 ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' :
                        'bg-rose-600/30 text-rose-300 border border-rose-500/40 animate-pulse'
                      }`}>
                        {score}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {score >= 88 ? 'Top 10%' : score >= 73 ? 'Solid' : score >= 60 ? 'Borderline' : 'At-Risk'}
                      </div>
                    </div>
                  </td>

                  {/* Academic / CGPA */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-200">
                      {student.academic.cgpa.toFixed(2)} CGPA
                    </div>
                    {student.academic.backlogs > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                        <AlertTriangle className="w-2.5 h-2.5" /> {student.academic.backlogs} Backlog(s)
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">0 Backlogs</span>
                    )}
                  </td>

                  {/* Attendance */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-200">
                      {student.attendance.overall}%
                    </div>
                    {isBelow75 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                        <AlertCircle className="w-2.5 h-2.5" /> &lt;75% Cutoff
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">AICTE Compliant</span>
                    )}
                  </td>

                  {/* Placement / Coding */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-200">
                      {student.placement.codingScore}/100 Coding
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {student.placement.aptitudeScore}% Aptitude
                    </div>
                  </td>

                  {/* Cohort (Bonus) */}
                  <td className="py-3 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {student.cohort.name}
                    </span>
                  </td>

                  {/* Overall Risk */}
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${riskTagStyles}`}>
                      {overallRisk === 'Critical' && <AlertTriangle className="w-2.5 h-2.5" />}
                      {overallRisk === 'Exemplary' && <Award className="w-2.5 h-2.5" />}
                      {student.metrics.risks.riskBadge}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      {/* 360 Dossier */}
                      <button
                        onClick={() => onSelectStudent(student)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Open 360° Student Dossier & Explainable Score"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* AI Action Plan Intervention */}
                      <button
                        onClick={() => onOpenIntervention(student)}
                        className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition"
                        title="Generate AI-Powered Action Plan & Intervention Dispatch"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      {/* What-If Simulation */}
                      <button
                        onClick={() => onOpenSimulator(student)}
                        className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition"
                        title="Simulate What-If Improvement Scenarios"
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
  );
}
