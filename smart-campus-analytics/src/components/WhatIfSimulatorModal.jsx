import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { simulateStudentScenario } from '../utils/simulationEngine';

export default function WhatIfSimulatorModal({ student, onClose, onSelectStudent }) {
  if (!student) return null;

  // Scenario parameters state
  const [attendanceDelta, setAttendanceDelta] = useState(12); // +12%
  const [lmsCompletionDelta, setLmsCompletionDelta] = useState(25); // +25%
  const [backlogsOverride, setBacklogsOverride] = useState(0); // cleared backlogs
  const [codingDelta, setCodingDelta] = useState(18); // +18 points
  const [mockInterviewDelta, setMockInterviewDelta] = useState(20); // +20 points

  // Run simulation
  const simulation = simulateStudentScenario(student, {
    attendanceDelta,
    lmsCompletionDelta,
    backlogsOverride,
    codingDelta,
    mockInterviewDelta
  });

  const { originalMetrics, newMetrics, scoreDelta, originalCohort, newCohort, simulatedStudent } = simulation;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setAttendanceDelta(0);
    setLmsCompletionDelta(0);
    setBacklogsOverride(student.academic.backlogs);
    setCodingDelta(0);
    setMockInterviewDelta(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  What-If Scenario Simulator
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Decision Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulating interventions for <strong className="text-slate-200">{student.name}</strong> ({student.usn})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Comparison Score Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Score</div>
              <div className="text-4xl font-black font-mono text-slate-300 mt-1">
                {originalMetrics.compositeScore}
              </div>
              <div className="text-xs text-rose-400 font-bold mt-1">
                {originalMetrics.risks.riskBadge}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 shadow-md">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className={`text-xs font-mono font-bold mt-2 px-2.5 py-0.5 rounded-full ${
                scoreDelta >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {scoreDelta >= 0 ? `+${scoreDelta} Points Jump` : `${scoreDelta} Points`}
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-center sm:justify-end gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Projected Score
              </div>
              <div className="text-5xl font-black font-mono text-emerald-400 mt-1">
                {newMetrics.compositeScore}
              </div>
              <div className="text-xs text-emerald-300 font-bold mt-1">
                {newMetrics.risks.riskBadge}
              </div>
            </div>
          </div>

          {/* Interactive Sliders Form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Targeted Intervention Levers
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Attendance Lever */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">
                  Improve Lecture Attendance
                </span>
                <span className="font-mono text-indigo-300 font-bold">
                  {student.attendance.overall}% ➔ {simulatedStudent.attendance.overall.toFixed(1)}% ({attendanceDelta >= 0 ? `+${attendanceDelta}%` : `${attendanceDelta}%`})
                </span>
              </div>
              <input 
                type="range"
                min="-15"
                max="35"
                step="1"
                value={attendanceDelta}
                onChange={(e) => setAttendanceDelta(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                Action: Attend remedial morning lectures & weekly laboratory catch-ups
              </div>
            </div>

            {/* Backlogs Override Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-slate-300">
                  Remedial Exam Backlog Clearance
                </span>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Simulate student clearing current {student.academic.backlogs} backlog paper(s) in supplementary term
                </div>
              </div>
              <button
                onClick={() => setBacklogsOverride(backlogsOverride === 0 ? student.academic.backlogs : 0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  backlogsOverride === 0 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {backlogsOverride === 0 ? '✓ Backlogs Cleared (0)' : `${student.academic.backlogs} Backlog(s)`}
              </button>
            </div>

            {/* LMS Completion Lever */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">
                  LMS Assignment Catch-up Rate
                </span>
                <span className="font-mono text-indigo-300 font-bold">
                  {student.lms.assignmentCompletionRate}% ➔ {simulatedStudent.lms.assignmentCompletionRate}% (+{lmsCompletionDelta}%)
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="48"
                step="2"
                value={lmsCompletionDelta}
                onChange={(e) => setLmsCompletionDelta(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                Action: Submits pending homework modules and resumes daily login activity
              </div>
            </div>

            {/* Placement Coding Lever */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">
                  Intensive Placement Bootcamp (Coding & Aptitude)
                </span>
                <span className="font-mono text-indigo-300 font-bold">
                  {student.placement.codingScore}/100 ➔ {simulatedStudent.placement.codingScore}/100 (+{codingDelta} pts)
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="40"
                step="2"
                value={codingDelta}
                onChange={(e) => setCodingDelta(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                Action: Complete 30 LeetCode Medium challenges & weekly timed mock assessments
              </div>
            </div>
          </div>

          {/* Outcome Summary */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs">
            <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Projected Transformation Impact:
            </div>
            <p className="text-slate-300 leading-relaxed">
              By fulfilling this intervention plan, <strong className="text-white">{student.name}</strong> elevates their Success Score from <span className="text-rose-400 font-mono font-bold">{originalMetrics.compositeScore}</span> to <span className="text-emerald-400 font-mono font-bold">{newMetrics.compositeScore}</span>, shifting their risk status from <span className="text-rose-400 font-semibold">{originalMetrics.risks.riskBadge}</span> to <span className="text-emerald-400 font-semibold">{newMetrics.risks.riskBadge}</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={triggerConfetti}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
          >
            <span>🎉 Celebrate Target</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Simulated Action Contract for ${student.name} saved to College Academic Advisor Records!`);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
            >
              Commit Intervention Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
