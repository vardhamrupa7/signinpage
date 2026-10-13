/**
 * Client-side authentication store (demo / hackathon grade).
 *
 * Accounts and the signed-in session live in the browser's localStorage.
 * Passwords are salted and hashed (SHA-256) before they are stored, so they are
 * never saved as plain text. This is NOT a replacement for a real backend:
 * anyone with access to the browser's dev tools can read or edit this data.
 * For production, move signUp / signIn to a server (e.g. Node + JWT) and keep
 * the same function signatures so the UI does not change.
 */

const USERS_KEY = 'sca_users_v1';
const SESSION_KEY = 'sca_session_v1';

// Faculty and administrator accounts must enter this code when they sign up.
export const STAFF_ACCESS_CODE = 'CAMPUS2026';

export const ROLES = {
  student: { id: 'student', label: 'Student' },
  faculty: { id: 'faculty', label: 'Faculty' },
  admin: { id: 'admin', label: 'Administrator' }
};

// Accounts that exist on first launch so the demo can be shown immediately.
export const DEMO_ACCOUNTS = [
  {
    name: 'Rohan Verma',
    email: 'rohan.verma@campus.edu',
    password: 'Student@123',
    role: 'student',
    usn: '1RV22CS042'
  },
  {
    name: 'Dr. S. K. Narayanan',
    email: 'faculty@campus.edu',
    password: 'Faculty@123',
    role: 'faculty',
    usn: ''
  },
  {
    name: 'Campus Administrator',
    email: 'admin@campus.edu',
    password: 'Admin@123',
    role: 'admin',
    usn: ''
  }
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export class AuthError extends Error {
  constructor(message, fieldErrors = {}) {
    super(message);
    this.name = 'AuthError';
    this.fieldErrors = fieldErrors;
  }
}

/* ---------------------------- storage helpers ---------------------------- */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function makeSalt() {
  const bytes = new Uint8Array(12);
  if (globalThis.crypto && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return toHex(bytes);
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  if (globalThis.crypto && globalThis.crypto.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
    return toHex(new Uint8Array(digest));
  }
  // Fallback for non-secure contexts (plain http on a LAN address).
  let h = 5381;
  for (const b of data) h = ((h << 5) + h + b) | 0;
  return `x${(h >>> 0).toString(16)}`;
}

function publicUser(user) {
  if (!user) return null;
  const { hash, salt, ...safe } = user;
  return safe;
}

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const normalizeUsn = (usn) => String(usn || '').trim().toUpperCase();

/* ------------------------------ validation ------------------------------- */

export function validatePassword(password) {
  if (!password || password.length < 8) return 'Use at least 8 characters.';
  if (!/[A-Za-z]/.test(password)) return 'Include at least one letter.';
  if (!/[0-9]/.test(password)) return 'Include at least one number.';
  return '';
}

/** 0 (empty) to 4 (strong) – used by the strength meter on the sign-up form. */
export function passwordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;
  return score;
}

export function usnExists(usn, students = []) {
  const wanted = normalizeUsn(usn);
  return !!wanted && students.some((s) => String(s.usn).toUpperCase() === wanted);
}

/* -------------------------------- accounts ------------------------------- */

/** Creates the demo accounts once. Safe to call on every app start. */
export async function ensureDemoAccounts() {
  const users = read(USERS_KEY, []);
  let changed = false;

  for (const demo of DEMO_ACCOUNTS) {
    if (users.some((u) => u.email === demo.email)) continue;
    const salt = makeSalt();
    users.push({
      id: `usr_${makeSalt()}`,
      name: demo.name,
      email: demo.email,
      role: demo.role,
      usn: demo.usn,
      createdAt: new Date().toISOString(),
      salt,
      hash: await hashPassword(demo.password, salt)
    });
    changed = true;
  }

  if (changed) write(USERS_KEY, users);
}

export async function signUp({ name, email, password, confirmPassword, role, usn, accessCode }, students = []) {
  const cleanName = String(name || '').trim();
  const cleanEmail = normalizeEmail(email);
  const cleanUsn = normalizeUsn(usn);
  const errors = {};

  if (cleanName.length < 2) errors.name = 'Enter your full name.';
  if (!EMAIL_RE.test(cleanEmail)) errors.email = 'Enter a valid email address.';

  const passwordProblem = validatePassword(password);
  if (passwordProblem) errors.password = passwordProblem;
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

  if (!ROLES[role]) {
    errors.role = 'Choose a role.';
  } else if (role === 'student') {
    if (!cleanUsn) errors.usn = 'Enter your USN.';
    else if (!usnExists(cleanUsn, students)) {
      errors.usn = 'This USN is not in the campus records. Check it and try again.';
    }
  } else if (String(accessCode || '').trim() !== STAFF_ACCESS_CODE) {
    errors.accessCode = 'Invalid access code. Ask your campus administrator.';
  }

  if (Object.keys(errors).length) {
    throw new AuthError('Fix the highlighted fields and try again.', errors);
  }

  const users = read(USERS_KEY, []);

  if (users.some((u) => u.email === cleanEmail)) {
    throw new AuthError('An account with this email already exists.', {
      email: 'This email is already registered. Sign in instead.'
    });
  }
  if (role === 'student' && users.some((u) => u.role === 'student' && u.usn === cleanUsn)) {
    throw new AuthError('An account already exists for this USN.', {
      usn: 'An account for this USN already exists. Sign in instead.'
    });
  }

  const salt = makeSalt();
  const user = {
    id: `usr_${makeSalt()}`,
    name: cleanName,
    email: cleanEmail,
    role,
    usn: role === 'student' ? cleanUsn : '',
    createdAt: new Date().toISOString(),
    salt,
    hash: await hashPassword(password, salt)
  };

  users.push(user);
  if (!write(USERS_KEY, users)) {
    throw new AuthError('Could not save your account. Allow site storage in your browser and try again.');
  }
  write(SESSION_KEY, { userId: user.id });
  return publicUser(user);
}

export async function signIn({ identifier, password }) {
  const id = String(identifier || '').trim();
  if (!id || !password) {
    throw new AuthError('Enter your email or USN and your password.', {
      identifier: id ? '' : 'Enter your email or USN.',
      password: password ? '' : 'Enter your password.'
    });
  }

  const users = read(USERS_KEY, []);
  const byEmail = id.toLowerCase();
  const byUsn = id.toUpperCase();
  const user = users.find((u) => u.email === byEmail || (u.usn && u.usn === byUsn));

  // Same message for "no such user" and "wrong password" so accounts cannot be probed.
  const failure = new AuthError('Incorrect email / USN or password.');
  if (!user) throw failure;

  const attempt = await hashPassword(password, user.salt);
  if (attempt !== user.hash) throw failure;

  write(SESSION_KEY, { userId: user.id });
  return publicUser(user);
}

export function getSessionUser() {
  const session = read(SESSION_KEY, null);
  if (!session || !session.userId) return null;
  const users = read(USERS_KEY, []);
  return publicUser(users.find((u) => u.id === session.userId));
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable – nothing to clear */
  }
}
