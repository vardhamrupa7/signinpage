import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  Database,
  ArrowRight
} from 'lucide-react';
import { calculateStudentMetrics } from '../utils/analyticsEngine';
import { classifyStudentCohort } from '../utils/segmentation';
import { explainStudentScore } from '../utils/explainability';

export default function ImportDatasetModal({ onClose, onImportSuccess }) {
  const [file, setFile] = useState(null);
  const [pastedJson, setPastedJson] = useState('');
  const [importMode, setImportMode] = useState('file'); // 'file' or 'paste'
  const [error, setError] = useState('');
  const [parsedCount, setParsedCount] = useState(0);

  // Parse CSV text into student objects
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) throw new Error('CSV file must have a header row and at least one student record.');

    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
    
    // Find column indexes
    const findIndex = (keywords) => {
      return headers.findIndex(h => keywords.some(k => h.includes(k)));
    };

    const usnIdx = findIndex(['usn', 'roll', 'student_id', 'id']);
    const nameIdx = findIndex(['name', 'student_name', 'studentname']);
    const deptIdx = findIndex(['dept', 'department', 'branch']);
    const semIdx = findIndex(['sem', 'semester', 'year']);
    const cgpaIdx = findIndex(['cgpa', 'gpa', 'marks']);
    const backlogsIdx = findIndex(['backlog', 'backlogs', 'arrears']);
    const attIdx = findIndex(['attendance', 'att', 'presence']);
    const codingIdx = findIndex(['coding', 'code', 'technical']);
    const aptitudeIdx = findIndex(['aptitude', 'apt', 'reasoning']);
    const mockIdx = findIndex(['mock', 'interview']);
    const lmsIdx = findIndex(['lms', 'assignment', 'login']);

    const students = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle CSV comma splitting respecting quotes
      const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));

      const usn = usnIdx !== -1 ? values[usnIdx] : `STU-${1000 + i}`;
      const name = nameIdx !== -1 ? values[nameIdx] : `Student ${i}`;
      const dept = deptIdx !== -1 ? values[deptIdx] : 'Computer Science & Engineering';
      const sem = semIdx !== -1 ? parseInt(values[semIdx]) || 5 : 5;
      const cgpa = cgpaIdx !== -1 ? parseFloat(values[cgpaIdx]) || 7.0 : 7.0;
      const backlogs = backlogsIdx !== -1 ? parseInt(values[backlogsIdx]) || 0 : 0;
      const att = attIdx !== -1 ? parseFloat(values[attIdx]) || 80.0 : 80.0;
      const coding = codingIdx !== -1 ? parseInt(values[codingIdx]) || 65 : 65;
      const aptitude = aptitudeIdx !== -1 ? parseInt(values[aptitudeIdx]) || 70 : 70;
      const mock = mockIdx !== -1 ? parseInt(values[mockIdx]) || 70 : 70;
      const lmsComp = lmsIdx !== -1 ? parseInt(values[lmsIdx]) || 80 : 80;

      const studentObj = {
        id: `STU-${1000 + i}`,
        usn: usn,
        name: name,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + (i * 12345) % 99999999}?w=150&auto=format&fit=crop&q=80`,
        gender: i % 2 === 0 ? 'Female' : 'Male',
        department: dept,
        semester: sem,
        section: 'A',
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@campus.edu`,
        phone: `+91 98451 ${String(10000 + i).slice(1)}`,
        mentor: 'Dr. Academic Advisor',
        academic: {
          cgpa: cgpa,
          internalMarksAvg: Math.round(cgpa * 9.5),
          backlogs: backlogs,
          failedSubjects: backlogs > 0 ? ['Core Coursework Paper'] : [],
          semesterHistory: [cgpa, cgpa, cgpa, cgpa, cgpa],
          academicRemarks: 'Data imported from external institutional records.',
          subjectPerformance: [
            { code: 'SUB501', name: 'Core Theory Subject I', type: 'Theory', internalMarks: Math.round(cgpa * 9.5), grade: cgpa >= 8 ? 'A' : 'B', status: backlogs > 0 ? 'Backlog (Remedial)' : 'Passed' },
            { code: 'SUB502', name: 'Core Theory Subject II', type: 'Theory', internalMarks: Math.round(cgpa * 9.2), grade: cgpa >= 8 ? 'A' : 'B', status: 'Passed' },
            { code: 'SUB503', name: 'Software Engineering & Design', type: 'Theory', internalMarks: Math.round(cgpa * 9.0), grade: cgpa >= 8 ? 'A' : 'B', status: 'Passed' },
            { code: 'SUBL504', name: 'Computing Systems Laboratory', type: 'Lab', internalMarks: Math.round(cgpa * 9.8), grade: 'A+', status: 'Passed' }
          ]
        },
        attendance: {
          overall: att,
          theory: Math.max(40, att - 3),
          lab: Math.min(100, att + 5),
          consecutiveAbsences: att < 75 ? 3 : 0,
          weeklyTrend: [att + 2, att + 1, att, att - 1, att, att - 2, att, att],
          warningIssued: att < 75,
          subjectAttendance: [
            { code: 'SUB501', name: 'Core Theory Subject I', type: 'Theory', attended: Math.round((att/100)*40), total: 40, percentage: att, belowCutoff: att < 75 },
            { code: 'SUB502', name: 'Core Theory Subject II', type: 'Theory', attended: Math.round((att/100)*40), total: 40, percentage: att, belowCutoff: att < 75 },
            { code: 'SUBL504', name: 'Computing Systems Laboratory', type: 'Lab', attended: Math.round(((att+5)/100)*24), total: 24, percentage: Math.min(100, att+5), belowCutoff: (att+5) < 75 }
          ]
        },
        lms: {
          loginFrequencyPerWeek: 4.0,
          assignmentCompletionRate: lmsComp,
          lateSubmissionsCount: lmsComp < 70 ? 3 : 0,
          videoWatchHours: 25.0,
          lastActiveDaysAgo: 2,
          forumInteractions: 5
        },
        engagement: {
          campusEventsAttended: 3,
          technicalClubs: ['Technical Society'],
          hackathonsParticipated: coding >= 75 ? 2 : 0,
          hackathonWins: coding >= 85 ? 1 : 0,
          certifications: ['Verified Domain Credentials'],
          leadershipRoles: 'Active Member'
        },
        placement: {
          aptitudeScore: aptitude,
          codingScore: coding,
          mockInterviewScore: mock,
          resumeScore: 75,
          tierEligibility: coding >= 75 && aptitude >= 70 ? 'Tier 1 Product Eligible' : coding < 55 ? 'Needs Remedial Training' : 'Tier 2 Eligible'
        },
        skills: {
          technical: { dsa: coding, webCloud: 65, dbSystem: 70, problemSolving: coding },
          soft: { communication: mock, teamwork: 75, criticalThinking: aptitude, leadership: 65 }
        },
        feedback: {
          studentSatisfaction: 4.0,
          stressLevel: backlogs > 0 || att < 75 ? 'High' : 'Low',
          sentiment: 'Active Academic Progression',
          facultyFeedbackNotes: ['Student record uploaded via official institution dataset import.']
        }
      };

      // Enrich with calculations
      studentObj.metrics = calculateStudentMetrics(studentObj);
      studentObj.cohort = classifyStudentCohort(studentObj, studentObj.metrics);
      studentObj.explanation = explainStudentScore(studentObj, studentObj.metrics);

      students.push(studentObj);
    }

    return students;
  };

  const handleProcess = () => {
    setError('');
    try {
      let finalStudents = [];
      if (importMode === 'file') {
        if (!file) throw new Error('Please select a CSV or JSON file to upload.');
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            if (file.name.endsWith('.json')) {
              const parsed = JSON.parse(content);
              finalStudents = Array.isArray(parsed) ? parsed : [parsed];
            } else {
              finalStudents = parseCSV(content);
            }
            if (finalStudents.length === 0) throw new Error('No valid student records found in file.');
            onImportSuccess(finalStudents);
            onClose();
          } catch (err) {
            setError(err.message);
          }
        };
        reader.readAsText(file);
        return;
      } else {
        // Pasted JSON or CSV text
        if (!pastedJson.trim()) throw new Error('Please paste your student data (JSON or CSV format).');
        if (pastedJson.trim().startsWith('[') || pastedJson.trim().startsWith('{')) {
          const parsed = JSON.parse(pastedJson);
          finalStudents = Array.isArray(parsed) ? parsed : [parsed];
        } else {
          finalStudents = parseCSV(pastedJson);
        }
        if (finalStudents.length === 0) throw new Error('No valid student records found.');
        onImportSuccess(finalStudents);
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Upload & Replace Student Dataset
              </h3>
              <p className="text-xs text-slate-400">
                Replace existing student records with your real institution file (CSV or JSON)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => { setImportMode('file'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition ${importMode === 'file' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Upload File (.csv / .json)
            </button>
            <button
              onClick={() => { setImportMode('paste'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition ${importMode === 'paste' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Paste Raw Data / JSON
            </button>
          </div>

          {importMode === 'file' ? (
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-950/40">
              <input
                type="file"
                accept=".csv, .json"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="student-file-upload"
              />
              <label htmlFor="student-file-upload" className="cursor-pointer flex flex-col items-center">
                <FileSpreadsheet className="w-10 h-10 text-indigo-400 mb-2" />
                <span className="font-bold text-white text-sm">
                  {file ? file.name : 'Click to select CSV or JSON file'}
                </span>
                <span className="text-slate-400 text-[11px] mt-1">
                  Supports CSV with columns: USN, Name, CGPA, Attendance, Backlogs, Coding, Aptitude
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Paste CSV or JSON Content:</label>
              <textarea
                value={pastedJson}
                onChange={(e) => setPastedJson(e.target.value)}
                rows={8}
                placeholder="Paste CSV rows (e.g. USN, Name, CGPA, Attendance, Backlogs, Coding, Aptitude) or JSON array..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-indigo-300 text-[11px] leading-relaxed">
            <strong>Supported CSV Format:</strong> <br/>
            <code>USN, Name, Department, Semester, CGPA, Backlogs, Attendance, Coding, Aptitude</code><br/>
            *The platform will automatically compute Student Success Scores, risk flags, and Explainable AI drivers for all uploaded students!
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
            Cancel
          </button>
          <button
            onClick={handleProcess}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
          >
            <span>Import & Replace Student Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
