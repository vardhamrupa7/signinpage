import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Mail, 
  CheckSquare, 
  Square, 
  UserPlus, 
  Send, 
  Calendar, 
  Copy, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function InterventionModal({ student, onClose }) {
  if (!student) return null;

  const [activeRecipient, setActiveRecipient] = useState('student'); // 'student', 'advisor', 'parent'
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  // Checkbox state for action items
  const [actions, setActions] = useState([
    { id: 'counsel', label: 'Schedule 1-on-1 Academic Proctor Advising Session', checked: true },
    { id: 'peer', label: 'Assign Peer Student Mentor (from Campus Champions cohort)', checked: student.metrics.compositeScore < 70 },
    { id: 'bootcamp', label: 'Mandate 4-Week Coding & Aptitude Remedial Bootcamp', checked: student.placement.codingScore < 60 },
    { id: 'attendance', label: 'Issue Formal Notice for Attendance Recovery (< 75% Cutoff)', checked: student.attendance.overall < 75 },
    { id: 'wellbeing', label: 'Connect with Campus Counseling & Stress Management Cell', checked: student.feedback.stressLevel === 'High' }
  ]);

  const toggleAction = (id) => {
    setActions(actions.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  // Pre-drafted automated emails
  const studentEmail = `Subject: Smart Campus Academic Advisory & Personalized Support Plan [${student.usn}]

Dear ${student.name},

I hope this note finds you well. As part of our campus student success monitoring, your proctor and department academic committee have reviewed your semester indicators.

Current Academic Profile:
- Current Success Score: ${student.metrics.compositeScore}/100
- Attendance Record: ${student.attendance.overall}% ${student.attendance.overall < 75 ? '(Urgent: Below statutory 75% cutoff)' : ''}
- Active Backlogs: ${student.academic.backlogs}

We are here to support your success and help you achieve your career aspirations. We have formulated an intervention plan:
${actions.filter(a => a.checked).map(a => `• ${a.label}`).join('\n')}

Please meet your proctor, ${student.mentor}, this Thursday at 3:00 PM in the Department Office.

Warm regards,
Dean of Academic Affairs & Student Success Committee`;

  const advisorEmail = `Subject: ACTION REQUIRED: At-Risk Intervention Dossier for ${student.name} (${student.usn})

Dear ${student.mentor},

The AI Smart Campus Analytics platform has flagged ${student.name} for proactive intervention.

Key Risk Drivers:
${student.explanation.drivers.filter(d => d.type === 'negative').map(d => `• ${d.factor}: ${d.detail}`).join('\n')}

Recommended Action Protocol:
1. Conduct root-cause diagnostic interview.
2. Review attendance and coordinate with subject instructors.
3. Track weekly LMS submissions.

Please submit an intervention update in the Proctor Portal within 7 business days.

Campus Analytics Office`;

  const parentEmail = `Subject: Official Academic & Attendance Advisory Notice — ${student.name} (${student.usn})

Dear Guardian / Parent of ${student.name},

We are writing from the Academic Affairs Committee regarding your ward's current semester progress:

- Course Attendance: ${student.attendance.overall}% (Statutory AICTE regulation requires minimum 75%)
- Current Course Backlogs: ${student.academic.backlogs}
- Semester Standing: ${student.metrics.risks.riskBadge}

To ensure timely degree completion and placement eligibility, please schedule an appointment with our department head or mentor proctor (${student.mentor}).

Sincerely,
Registrar & Student Affairs`;

  const activeEmailText = 
    activeRecipient === 'student' ? studentEmail :
    activeRecipient === 'advisor' ? advisorEmail : parentEmail;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEmailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      alert(`Intervention Package successfully dispatched to ${student.name}, advisor, and campus administration!`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  AI Prescriptive Intervention Dispatcher
                </h2>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Decision Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted actions for <strong className="text-slate-200">{student.name}</strong> ({student.usn})
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
          {/* Action Checklist */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Select Prescriptive Action Protocols:
            </h3>
            <div className="space-y-2">
              {actions.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleAction(act.id)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition ${
                    act.checked 
                      ? 'bg-indigo-950/30 border-indigo-500/30 text-white' 
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {act.checked ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className="font-medium">{act.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Automated Pre-drafted Communication Dispatch */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Automated Notification Dispatch:
              </h3>
              {/* Recipient Switcher */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveRecipient('student')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeRecipient === 'student' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Student Notice
                </button>
                <button
                  onClick={() => setActiveRecipient('advisor')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeRecipient === 'advisor' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Faculty Proctor Brief
                </button>
                <button
                  onClick={() => setActiveRecipient('parent')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeRecipient === 'parent' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Guardian / Parent Alert
                </button>
              </div>
            </div>

            {/* Email Textbox */}
            <div className="relative">
              <textarea
                value={activeEmailText}
                readOnly
                rows={9}
                className="w-full p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed resize-none focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {actions.filter(a => a.checked).length} Action Protocols Selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              disabled={dispatched}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dispatched ? 'Dispatching...' : 'Dispatch Intervention'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
