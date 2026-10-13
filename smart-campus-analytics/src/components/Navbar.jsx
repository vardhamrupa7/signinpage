import React from 'react';
import {
  GraduationCap,
  Search,
  Building2,
  Users,
  Database,
  Download,
  Sparkles,
  Printer,
  LogOut,
  UserCircle2
} from 'lucide-react';

const ROLE_LABEL = {
  student: 'Student',
  faculty: 'Faculty',
  admin: 'Administrator'
};

export default function Navbar({
  user,
  activeTab,
  setActiveTab,
  allowedTabs = ['lookup'],
  canImport = false,
  canExport = false,
  canDemo = false,
  onExportCsv,
  onPrintReport,
  onOpenDemoTour,
  onOpenImport,
  onSignOut
}) {
  const isStudent = user?.role === 'student';

  const allTabs = [
    {
      id: 'lookup',
      icon: Search,
      label: isStudent ? 'My Analytics' : 'Student Lookup (By ID)'
    },
    { id: 'admin', icon: Building2, label: 'Faculty & Admin Dashboard' },
    { id: 'segmentation', icon: Users, label: 'Student Cohorts', badge: 'Bonus' },
    { id: 'integration', icon: Database, label: 'Data Integration (7 Streams)' }
  ];
  const tabs = allTabs.filter((t) => allowedTabs.includes(t.id));

  const initials = (user?.name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <header className="sticky top-0 z-30 bg-[#0c1222]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Brand & Mission Statement */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Smart Campus Analytics
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-2.5 h-2.5" /> AI Engine v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Predict, Optimize & Improve Student Success • Actionable Decision Intelligence
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs (hidden when the role has only one view) */}
        {tabs.length > 1 && (
          <nav
            aria-label="Main"
            className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium self-start xl:self-auto overflow-x-auto max-w-full"
          >
            {tabs.map(({ id, icon: Icon, label, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                {badge && (
                  <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1 py-0.5 rounded font-mono font-bold">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls, Export & Account */}
        <div className="flex flex-wrap items-center gap-2">
          {canImport && (
            <button
              onClick={onOpenImport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition shadow-sm"
              title="Upload CSV / JSON file of students to replace data"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload Student File</span>
            </button>
          )}

          {canDemo && (
            <button
              onClick={onOpenDemoTour}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
              title="Open Hackathon Demo Walkthrough Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Demo Guide</span>
            </button>
          )}

          {canExport && (
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-medium transition"
              title="Export CSV of student analytics"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}

          <button
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-medium transition"
            title="Print this page"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Signed-in user */}
          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-slate-800">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/30 text-[11px] font-bold text-indigo-200 ring-1 ring-indigo-500/40"
              aria-hidden="true"
            >
              {initials || <UserCircle2 className="w-4 h-4" />}
            </span>
            <div className="hidden md:block leading-tight">
              <p className="max-w-[140px] truncate text-xs font-semibold text-white">{user?.name}</p>
              <p className="text-[10px] text-slate-400">{ROLE_LABEL[user?.role] || ''}</p>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
