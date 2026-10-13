import React, { useState } from 'react';
import { Eye, EyeOff, Sliders, Activity, PieChart as PieIcon, TrendingUp } from 'lucide-react';

/**
 * BackgroundCharts Component
 * Fulfills prompt requirement: "the background should have the student analysis pie chart and graphs of the student attendance"
 * Renders an ambient, interactive background layer featuring dynamic student analysis pie/donut charts,
 * attendance wave graphs, statutory 75% cutoff threshold indicators, and floating telemetry indicators.
 */
export default function BackgroundCharts({ students }) {
  const [opacity, setOpacity] = useState(0.22);
  const [showControls, setShowControls] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Compute live background statistics from students
  const total = students.length || 1;
  const criticalCount = students.filter(s => s.metrics.risks.overall === 'Critical').length;
  const warningCount = students.filter(s => s.metrics.risks.overall === 'Warning').length;
  const onTrackCount = students.filter(s => s.metrics.risks.overall === 'On Track').length;
  const championCount = students.filter(s => s.metrics.risks.overall === 'Exemplary').length;

  const critPct = (criticalCount / total) * 100;
  const warnPct = (warningCount / total) * 100;
  const onTrackPct = (onTrackCount / total) * 100;
  const champPct = (championCount / total) * 100;

  // Average weekly attendance points for ambient attendance graph
  const avgWeekly = [85, 83.5, 82, 80.5, 79, 78.2, 79.5, 80.8];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Radial Glow Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      {/* Ambient Student Analysis Pie Chart & Radar floating on Top-Right */}
      <div 
        className={`absolute top-20 right-6 md:right-24 w-80 h-80 transition-all duration-700 ${animate ? 'animate-float-slow' : ''}`}
        style={{ opacity }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(99,102,241,0.25)]">
          {/* Outer Calibration Ring */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.4" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.2" />

          {/* Student Analysis Donut / Pie Segments */}
          {/* Champions (Purple/Indigo) */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#818cf8"
            strokeWidth="28"
            strokeDasharray={`${(champPct / 100) * 377} 377`}
            strokeDashoffset="0"
            transform="rotate(-90 100 100)"
          />
          {/* On Track (Emerald) */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#10b981"
            strokeWidth="28"
            strokeDasharray={`${(onTrackPct / 100) * 377} 377`}
            strokeDashoffset={`-${(champPct / 100) * 377}`}
            transform="rotate(-90 100 100)"
          />
          {/* Warning (Amber) */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="28"
            strokeDasharray={`${(warnPct / 100) * 377} 377`}
            strokeDashoffset={`-${((champPct + onTrackPct) / 100) * 377}`}
            transform="rotate(-90 100 100)"
          />
          {/* Critical At-Risk (Rose) */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="28"
            strokeDasharray={`${(critPct / 100) * 377} 377`}
            strokeDashoffset={`-${((champPct + onTrackPct + warnPct) / 100) * 377}`}
            transform="rotate(-90 100 100)"
          />

          {/* Inner Core Telemetry */}
          <circle cx="100" cy="100" r="42" fill="#0b0f19" opacity="0.85" />
          <text x="100" y="94" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="1">
            CAMPUS RISK
          </text>
          <text x="100" y="108" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
            {total} STU
          </text>
          <text x="100" y="119" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="600">
            {Math.round(onTrackPct + champPct)}% IN GOOD STANDING
          </text>

          {/* Crosshairs & Ticks */}
          <line x1="100" y1="2" x2="100" y2="12" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="100" y1="188" x2="100" y2="198" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="2" y1="100" x2="12" y2="100" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="188" y1="100" x2="198" y2="100" stroke="#6366f1" strokeWidth="1.5" />
        </svg>

        {/* Floating Pie Label Tag */}
        <div className="text-center mt-2 font-mono text-[10px] text-indigo-300/80 tracking-wider">
          AI STUDENT CLUSTER PIE ANALYSIS [LIVE]
        </div>
      </div>

      {/* Ambient Student Attendance Wave Graphs floating at the Bottom */}
      <div 
        className={`absolute bottom-4 left-0 right-0 h-72 transition-all duration-700 ${animate ? 'animate-float-reverse' : ''}`}
        style={{ opacity: opacity * 0.9 }}
      >
        <svg viewBox="0 0 1200 240" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <defs>
            <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="labGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid / Benchmark Threshold Lines */}
          <line x1="0" y1="60" x2="1200" y2="60" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.3" />
          {/* Statutory 75% Attendance AICTE Threshold Line */}
          <line x1="0" y1="110" x2="1200" y2="110" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
          <text x="24" y="104" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.7">
            AICTE STATUTORY CUTOFF: 75% ATTENDANCE THRESHOLD
          </text>

          <line x1="0" y1="160" x2="1200" y2="160" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.3" />

          {/* Theory Attendance Area Wave */}
          <path
            d="M 0 140 
               C 150 110, 250 80, 400 95 
               C 550 110, 680 150, 820 120 
               C 960 90, 1080 75, 1200 85 
               L 1200 240 L 0 240 Z"
            fill="url(#attendanceGradient)"
          />

          {/* Theory Attendance Line */}
          <path
            d="M 0 140 
               C 150 110, 250 80, 400 95 
               C 550 110, 680 150, 820 120 
               C 960 90, 1080 75, 1200 85"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.2"
          />

          {/* Lab Practical Attendance Area Wave */}
          <path
            d="M 0 100 
               C 180 85, 320 60, 500 70 
               C 680 80, 800 110, 950 90 
               C 1070 70, 1150 65, 1200 70 
               L 1200 240 L 0 240 Z"
            fill="url(#labGradient)"
          />

          {/* Lab Practical Line */}
          <path
            d="M 0 100 
               C 180 85, 320 60, 500 70 
               C 680 80, 800 110, 950 90 
               C 1070 70, 1150 65, 1200 70"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeDasharray="6 3"
          />

          {/* Data Sample Dots on the Attendance Curve */}
          <circle cx="150" cy="110" r="3.5" fill="#818cf8" />
          <circle cx="400" cy="95" r="3.5" fill="#818cf8" />
          <circle cx="680" cy="150" r="3.5" fill="#f43f5e" />
          <circle cx="820" cy="120" r="3.5" fill="#818cf8" />
          <circle cx="1080" cy="75" r="3.5" fill="#818cf8" />

          {/* Attendance Graph Annotations */}
          <text x="680" y="172" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="middle">
            WEEK 5 ATTENDANCE DIP (FEST WEEK)
          </text>
        </svg>

        {/* Legend in the corner of background graph */}
        <div className="absolute bottom-2 left-6 flex items-center gap-4 text-[10px] font-mono text-slate-400/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-indigo-400 inline-block"></span>
            <span>Theory Attendance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-400 border-b border-dashed inline-block"></span>
            <span>Laboratory Practical Attendance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-rose-500 border-b border-dotted inline-block"></span>
            <span>75% Minimum Statutory Line</span>
          </div>
        </div>
      </div>

      {/* Interactive Background Overlay Controller Widget (Clickable by User) */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto">
        <div className="relative">
          {showControls ? (
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-2xl flex flex-col gap-2.5 w-60 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <PieIcon className="w-3.5 h-3.5" /> Background Visuals
                </span>
                <button 
                  onClick={() => setShowControls(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Visual Opacity</span>
                  <span className="font-mono">{Math.round(opacity * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.05" 
                  max="0.60" 
                  step="0.02"
                  value={opacity} 
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Ambient Float</span>
                <button
                  onClick={() => setAnimate(!animate)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                    animate ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {animate ? 'Active' : 'Paused'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowControls(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs shadow-lg backdrop-blur-md transition-all group hover:border-indigo-500/50"
              title="Configure Background Pie Chart & Attendance Graph Overlay"
            >
              <PieIcon className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-45 transition-transform" />
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-medium">Background Analytics View</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
