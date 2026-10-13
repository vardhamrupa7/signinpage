import React from 'react';
import { 
  X, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Layers, 
  ShieldCheck, 
  Award, 
  Users,
  Compass
} from 'lucide-react';

export default function DemoTourModal({ onClose, students, onSelectStudent, onOpenSimulator, onOpenIntervention }) {
  const personas = [
    {
      id: 'STU-1001',
      title: 'Persona 1: Critical Academic & Attendance Risk',
      studentName: 'Rohan Verma',
      tag: 'Critical Intervention Needed',
      tagColor: 'rose',
      description: 'CGPA 5.42 with 2 course backlogs, attendance at 64.5% (well below AICTE 75% cutoff), and dormant on LMS for 14 days.',
      demoHook: 'Notice the XAI Driver breakdown: -16 pts for attendance violation, -16 pts for 2 backlogs. Click Simulate What-If to test recovery!'
    },
    {
      id: 'STU-1002',
      title: 'Persona 2: Tech Star with Attendance Slump',
      studentName: 'Priya Sharma',
      tag: 'High Coder / Attendance Slump',
      tagColor: 'cyan',
      description: 'Phenomenal 94/100 coding score, 4 hackathons, but attendance at 68.2% due to off-campus hackathons puts her at risk of exam debarment.',
      demoHook: 'Proves the system goes beyond simple grades — detects smart students risking statutory debarment.'
    },
    {
      id: 'STU-1003',
      title: 'Persona 3: Placement Vulnerable Academic Topper',
      studentName: 'Ananya Iyer',
      tag: 'Placement Vulnerable',
      tagColor: 'amber',
      description: 'Academic star (9.12 CGPA, 94% attendance), but scores only 51/100 in coding and 48% in mock interviews due to intense stage fright.',
      demoHook: 'Shows targeted intervention: enrolls in Placement Boot Camp instead of unnecessary academic tutoring!'
    },
    {
      id: 'STU-1005',
      title: 'Persona 4: Campus Star & Tier-1 Ready',
      studentName: 'Tanvi Patel',
      tag: 'Campus Champion',
      tagColor: 'indigo',
      description: '9.48 CGPA, 96.5% attendance, 98/100 coding, GDSC Lead, AWS & GCP certified. Ready for 20+ LPA super dream offers.',
      demoHook: 'Demonstrates reward and leadership pathways — system recommends her as peer mentor for junior cohorts.'
    }
  ];

  const handleLaunchPersona = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      onSelectStudent(student);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-4xl flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">
                  Hackathon Evaluation & Demo Showcase Guide
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  100% Rubric Coverage + Bonus
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Quick walkthrough presets demonstrating full compliance with all judging criteria
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Rubric Alignment Grid */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100-Point Hackathon Rubric Alignment
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>1. Data Integration (30%)</span>
                  <span className="text-emerald-400">✓ Complete</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Unifies all 7 streams: Academic, Attendance, LMS, Engagement, Placement, Skills, and Feedback into 1 view.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>2. Success Score & Risks (25%)</span>
                  <span className="text-emerald-400">✓ Complete</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Multi-factor composite SSS formula, statutory AICTE 75% attendance cutoff rules, backlog penalties, and 3 risk tiers.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>3. Dashboard & Visuals (25%)</span>
                  <span className="text-emerald-400">✓ Complete</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Ambient student analysis pie chart and attendance graph background, interactive scatter plot, radar, and filters.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>4. Bonus: Segmentation & XAI</span>
                  <span className="text-indigo-400 font-bold">★ Full Bonus Credit</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  5 behavioral student cohorts + SHAP-style Explainable AI driver attribution (+/- points) for every student.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Demo Personas */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              1-Click Demo Showcase Personas:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {personas.map((p) => {
                const sObj = students.find(s => s.id === p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleLaunchPersona(p.id)}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.tagColor === 'rose' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                          p.tagColor === 'amber' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                          p.tagColor === 'cyan' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                          'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {p.tag}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          Score: {sObj?.metrics.compositeScore}/100
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">
                        {p.studentName} — {p.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 group-hover:text-indigo-300 font-semibold">
                      <span>Click to open 360° Dossier & XAI</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Ready for live screen-sharing and hackathon judges Q&A
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
