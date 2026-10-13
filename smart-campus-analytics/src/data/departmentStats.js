/**
 * Campus Department Benchmarks and Integration Pipeline Status
 */

export const DEPARTMENT_BENCHMARKS = {
  'Computer Science & Engineering': {
    code: 'CSE',
    studentCount: 420,
    facultyCount: 28,
    avgCgpa: 7.78,
    avgAttendance: 84.6,
    avgSuccessScore: 76.4,
    placementRate: 88.5,
    atRiskPercent: 9.5
  },
  'AI & Data Science': {
    code: 'AI&DS',
    studentCount: 240,
    facultyCount: 16,
    avgCgpa: 7.92,
    avgAttendance: 86.2,
    avgSuccessScore: 78.8,
    placementRate: 91.2,
    atRiskPercent: 7.8
  },
  'Electronics & Communication': {
    code: 'ECE',
    studentCount: 360,
    facultyCount: 24,
    avgCgpa: 7.34,
    avgAttendance: 82.1,
    avgSuccessScore: 72.5,
    placementRate: 82.0,
    atRiskPercent: 14.2
  }
};

export const DATA_INTEGRATION_PIPELINES = [
  {
    id: 'pipe-erp',
    name: 'Campus ERP & Academic Registrar',
    category: 'Academic Records',
    source: 'Oracle Campus Solutions / SAP Higher Ed',
    frequency: 'Hourly (Sync complete 12m ago)',
    status: 'Active',
    recordsIngested: '1,020 Students',
    healthScore: '99.8%',
    description: 'Pulls official CGPA, semester credit audits, internal exam marks, and backlog registries.'
  },
  {
    id: 'pipe-biometrics',
    name: 'Classroom RFID & Biometrics Gateway',
    category: 'Attendance Tracking',
    source: 'IoT Edge Turnstiles & Smart Lectern Readers',
    frequency: 'Real-time Webhook (Every 5 mins)',
    status: 'Active',
    recordsIngested: '14,240 Punch logs today',
    healthScore: '100%',
    description: 'Tracks lecture and laboratory presence against statutory AICTE 75% cutoff threshold.'
  },
  {
    id: 'pipe-lms',
    name: 'Moodle / Canvas LMS Connector',
    category: 'Digital Learning Engagement',
    source: 'Moodle REST API v2.8',
    frequency: 'Every 15 minutes',
    status: 'Active',
    recordsIngested: '8,410 Assignment submissions',
    healthScore: '99.4%',
    description: 'Streams assignment timestamps, video consumption, discussion forums, and inactivity alerts.'
  },
  {
    id: 'pipe-placement',
    name: 'Campus Placement & Coding Portal',
    category: 'Employability & Assessments',
    source: 'HackerRank API + Superset Placement Engine',
    frequency: 'Daily at 00:00 UTC',
    status: 'Active',
    recordsIngested: '450 Assessment attempts',
    healthScore: '98.9%',
    description: 'Synchronizes LeetCode-style coding scores, aptitude percentiles, and mock interview marks.'
  },
  {
    id: 'pipe-feedback',
    name: 'Student Pulse & Mentor Proctor Notes',
    category: 'Student Feedback & Wellbeing',
    source: 'Faculty Proctor Mobile App',
    frequency: 'On-demand & Weekly',
    status: 'Active',
    recordsIngested: '380 Proctor Notes logged',
    healthScore: '100%',
    description: 'Captures counselor 1-on-1 observations, student stress ratings, and sentiment analysis.'
  }
];
