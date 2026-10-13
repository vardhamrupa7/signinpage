import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Mail,
  Lock,
  User,
  KeyRound,
  Hash,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  signIn,
  signUp,
  AuthError,
  DEMO_ACCOUNTS,
  passwordStrength,
  usnExists
} from '../utils/authStore';

const ROLE_OPTIONS = [
  {
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    sees: 'Your own success score, risk flags and improvement plan.'
  },
  {
    id: 'faculty',
    label: 'Faculty',
    icon: Users,
    sees: 'The class dashboard, at-risk queue and student cohorts.'
  },
  {
    id: 'admin',
    label: 'Administrator',
    icon: ShieldCheck,
    sees: 'Everything faculty see, plus data integration and file upload.'
  }
];

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['bg-slate-700', 'bg-rose-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-500'];

const EMPTY_FORM = {
  name: '',
  email: '',
  usn: '',
  accessCode: '',
  identifier: '',
  password: '',
  confirmPassword: ''
};

function Field({ id, label, icon: Icon, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-300 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-slate-950/80 px-3 transition focus-within:ring-2 ${
          error
            ? 'border-rose-500/70 focus-within:ring-rose-500/30'
            : 'border-slate-700 focus-within:border-indigo-500 focus-within:ring-indigo-500/30'
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />}
        {children}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-xs text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  'w-full bg-transparent py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none';

export default function AuthPage({ students, onAuthenticated }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [role, setRole] = useState('student');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSignUp = mode === 'signup';
  const strength = passwordStrength(form.password);
  const usnTyped = form.usn.trim().length > 0;
  const usnFound = usnTyped && usnExists(form.usn, students);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (formError) setFormError('');
  };

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
    setFormError('');
    setShowPassword(false);
    setForm((prev) => ({ ...EMPTY_FORM, email: next === 'signup' ? prev.email : '' }));
  };

  const fillDemo = (account) => {
    setMode('signin');
    setErrors({});
    setFormError('');
    setForm({ ...EMPTY_FORM, identifier: account.email, password: account.password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErrors({});
    setFormError('');

    try {
      const user = isSignUp
        ? await signUp({ ...form, role }, students)
        : await signIn({ identifier: form.identifier, password: form.password });
      onAuthenticated(user);
    } catch (err) {
      if (err instanceof AuthError) {
        setErrors(err.fieldErrors || {});
        setFormError(Object.keys(err.fieldErrors || {}).length && isSignUp ? '' : err.message);
      } else {
        setFormError('Something went wrong. Refresh the page and try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="p-1 text-slate-500 hover:text-slate-200 focus:outline-none focus-visible:text-white"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* ------------------------------ Left: product panel ------------------------------ */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-slate-800/80 bg-gradient-to-br from-[#10162b] via-[#0d1224] to-[#0b0f19] p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">Smart Campus Analytics</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white">
            See which students need help while there is still time to give it.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Academic results, attendance, LMS activity, engagement, skills, placement scores and
            feedback combine into one success score for every student.
          </p>

          <ul className="mt-9 space-y-5">
            {ROLE_OPTIONS.map(({ id, label, icon: Icon, sees }) => (
              <li key={id} className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80">
                  <Icon className="h-4 w-4 text-indigo-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-sm text-slate-400">{sees}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          Attendance risk follows the AICTE 75% statutory rule.
        </p>
      </aside>

      {/* ------------------------------ Right: form ------------------------------ */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center ring-1 ring-white/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight">Smart Campus Analytics</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            {isSignUp ? 'Create your account' : 'Sign in'}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {isSignUp
              ? 'Pick your role, then fill in your details.'
              : 'Use the email or USN you registered with.'}
          </p>

          {/* Mode switch */}
          <div
            role="tablist"
            aria-label="Sign in or create account"
            className="mt-6 grid grid-cols-2 rounded-xl border border-slate-800 bg-slate-900/80 p-1 text-sm font-semibold"
          >
            {[
              { id: 'signin', label: 'Sign in' },
              { id: 'signup', label: 'Create account' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={mode === tab.id}
                onClick={() => switchMode(tab.id)}
                className={`rounded-lg py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  mode === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            {/* Role picker (sign up only) */}
            {isSignUp && (
              <fieldset>
                <legend className="mb-1.5 text-xs font-semibold text-slate-300">I am a</legend>
                <div className="grid grid-cols-3 gap-2">
                  {ROLE_OPTIONS.map(({ id, label, icon: Icon }) => (
                    <label
                      key={id}
                      className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition focus-within:ring-2 focus-within:ring-indigo-400 ${
                        role === id
                          ? 'border-indigo-500 bg-indigo-500/15 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={id}
                        checked={role === id}
                        onChange={() => {
                          setRole(id);
                          setErrors({});
                          setFormError('');
                        }}
                        className="sr-only"
                      />
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {isSignUp && (
              <Field id="name" label="Full name" icon={User} error={errors.name}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="As on your college ID"
                  className={inputClass}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </Field>
            )}

            {isSignUp ? (
              <Field id="email" label="Email" icon={Mail} error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@campus.edu"
                  className={inputClass}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </Field>
            ) : (
              <Field id="identifier" label="Email or USN" icon={Mail} error={errors.identifier}>
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  value={form.identifier}
                  onChange={update('identifier')}
                  placeholder="you@campus.edu or 1RV22CS042"
                  className={inputClass}
                  aria-invalid={!!errors.identifier}
                  aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                />
              </Field>
            )}

            {isSignUp && role === 'student' && (
              <Field
                id="usn"
                label="USN"
                icon={Hash}
                error={errors.usn}
                hint={
                  usnFound
                    ? undefined
                    : 'You will only see the analytics linked to this USN.'
                }
              >
                <input
                  id="usn"
                  type="text"
                  autoComplete="off"
                  value={form.usn}
                  onChange={update('usn')}
                  placeholder="1RV22CS042"
                  className={`${inputClass} font-mono uppercase`}
                  aria-invalid={!!errors.usn}
                  aria-describedby={errors.usn ? 'usn-error' : 'usn-hint'}
                />
                {usnFound && !errors.usn && (
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-label="USN found in campus records"
                  />
                )}
              </Field>
            )}

            {isSignUp && role !== 'student' && (
              <Field
                id="accessCode"
                label="Staff access code"
                icon={KeyRound}
                error={errors.accessCode}
                hint="Given to you by the campus administrator."
              >
                <input
                  id="accessCode"
                  type="password"
                  autoComplete="off"
                  value={form.accessCode}
                  onChange={update('accessCode')}
                  placeholder="Enter the access code"
                  className={inputClass}
                  aria-invalid={!!errors.accessCode}
                  aria-describedby={errors.accessCode ? 'accessCode-error' : 'accessCode-hint'}
                />
              </Field>
            )}

            <Field
              id="password"
              label="Password"
              icon={Lock}
              error={errors.password}
              hint={isSignUp ? 'At least 8 characters, with a letter and a number.' : undefined}
            >
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                value={form.password}
                onChange={update('password')}
                placeholder={isSignUp ? 'Create a password' : 'Your password'}
                className={inputClass}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : isSignUp ? 'password-hint' : undefined
                }
              />
              {passwordToggle}
            </Field>

            {isSignUp && form.password && (
              <div className="-mt-2" aria-live="polite">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        strength >= n ? STRENGTH_COLORS[strength] : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Password strength: <span className="text-slate-300">{STRENGTH_LABELS[strength] || 'Weak'}</span>
                </p>
              </div>
            )}

            {isSignUp && (
              <Field
                id="confirmPassword"
                label="Confirm password"
                icon={Lock}
                error={errors.confirmPassword}
              >
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  placeholder="Type it again"
                  className={inputClass}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
              </Field>
            )}

            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-200"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {busy
                ? isSignUp
                  ? 'Creating account…'
                  : 'Signing in…'
                : isSignUp
                ? 'Create account'
                : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button
              type="button"
              onClick={() => switchMode(isSignUp ? 'signin' : 'signup')}
              className="font-semibold text-indigo-400 hover:text-indigo-300 focus:outline-none focus-visible:underline"
            >
              {isSignUp ? 'Sign in' : 'Create an account'}
            </button>
          </p>

          {/* Demo accounts */}
          {!isSignUp && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                Demo accounts
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Select one to fill in the sign-in form.</p>
              <div className="mt-3 space-y-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-left transition hover:border-indigo-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-white">
                        {acc.role === 'admin' ? 'Administrator' : acc.role === 'faculty' ? 'Faculty' : 'Student'}
                        {' – '}
                        {acc.name}
                      </span>
                      <span className="block truncate font-mono text-[11px] text-slate-500">
                        {acc.email} / {acc.password}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
