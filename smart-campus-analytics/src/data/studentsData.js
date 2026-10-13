/**
 * Comprehensive Student Dataset
 * Covers all 7 data streams from campus ERP, LMS, Biometric Attendance, and Placement portals:
 * - Academic (CGPA, marks, backlogs, semester trend)
 * - Attendance (Overall %, theory %, lab %, weekly trends)
 * - LMS (Logins/wk, assignment completion %, last active)
 * - Engagement (Events, clubs, hackathons, certs)
 * - Placement (Aptitude, coding score, mock interview, resume)
 * - Skills (DSA, Cloud, Web, Soft skills)
 * - Feedback & Wellbeing (Satisfaction, stress, faculty notes)
 */

export const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    usn: '1RV22CS042',
    name: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 5,
    section: 'A',
    email: 'rohan.verma@campus.edu',
    phone: '+91 98451 22340',
    mentor: 'Dr. S. K. Narayanan (Assoc. Prof)',
    academic: {
      cgpa: 5.42,
      internalMarksAvg: 54,
      backlogs: 2,
      failedSubjects: ['Automata Theory & Computability', 'Database Management Systems'],
      semesterHistory: [6.8, 6.4, 5.9, 5.5, 5.42],
      coreStrengths: ['Basic Web Dev'],
      academicRemarks: 'Struggles with mathematical rigor; failed 2 core third-year theory papers.'
    },
    attendance: {
      overall: 64.5,
      theory: 61.0,
      lab: 74.0,
      consecutiveAbsences: 4,
      weeklyTrend: [75, 72, 70, 68, 65, 62, 60, 64.5],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 1.8,
      assignmentCompletionRate: 52,
      lateSubmissionsCount: 4,
      videoWatchHours: 12.4,
      lastActiveDaysAgo: 14,
      forumInteractions: 1
    },
    engagement: {
      campusEventsAttended: 1,
      technicalClubs: [],
      hackathonsParticipated: 0,
      hackathonWins: 0,
      certifications: [],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 48,
      codingScore: 42,
      mockInterviewScore: 40,
      resumeScore: 50,
      tierEligibility: 'Needs Remedial Training'
    },
    skills: {
      technical: { dsa: 38, webCloud: 52, dbSystem: 40, problemSolving: 44 },
      soft: { communication: 55, teamwork: 60, criticalThinking: 45, leadership: 40 }
    },
    feedback: {
      studentSatisfaction: 2.2,
      stressLevel: 'High',
      sentiment: 'Concerning',
      facultyFeedbackNotes: [
        'Often arrives late or leaves early during double lecture periods.',
        'Has not reached out during faculty office hours despite two failed midterms.',
        'Shows severe anxiety during coding lab vivas.'
      ]
    }
  },
  {
    id: 'STU-1002',
    usn: '1RV22AI018',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'AI & Data Science',
    semester: 5,
    section: 'B',
    email: 'priya.sharma@campus.edu',
    phone: '+91 97412 88419',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 6.35,
      internalMarksAvg: 62,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.8, 7.4, 6.9, 6.5, 6.35],
      coreStrengths: ['Deep Learning', 'PyTorch', 'Competitive Programming'],
      academicRemarks: 'Highly gifted in practical software and AI models, but neglects theory exam preparation.'
    },
    attendance: {
      overall: 68.2,
      theory: 62.0,
      lab: 88.0,
      consecutiveAbsences: 2,
      weeklyTrend: [82, 79, 75, 71, 68, 66, 67, 68.2],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 4.5,
      assignmentCompletionRate: 74,
      lateSubmissionsCount: 3,
      videoWatchHours: 34.0,
      lastActiveDaysAgo: 2,
      forumInteractions: 14
    },
    engagement: {
      campusEventsAttended: 6,
      technicalClubs: ['Google Developer Student Club', 'AI Society'],
      hackathonsParticipated: 4,
      hackathonWins: 2,
      certifications: ['DeepLearning.AI TensorFlow Developer', 'AWS Cloud Practitioner'],
      leadershipRoles: 'Hackathon Team Lead'
    },
    placement: {
      aptitudeScore: 78,
      codingScore: 94,
      mockInterviewScore: 82,
      resumeScore: 88,
      tierEligibility: 'Tier 1 Product Eligible'
    },
    skills: {
      technical: { dsa: 92, webCloud: 85, dbSystem: 78, problemSolving: 96 },
      soft: { communication: 75, teamwork: 88, criticalThinking: 90, leadership: 85 }
    },
    feedback: {
      studentSatisfaction: 3.8,
      stressLevel: 'Moderate',
      sentiment: 'Productive but Overextended',
      facultyFeedbackNotes: [
        'Brilliant coding hackathon winner; skip classes due to off-campus competitions.',
        'Needs strict warning on the mandatory 75% attendance policy to prevent exam debarment.'
      ]
    }
  },
  {
    id: 'STU-1003',
    usn: '1RV21CS089',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'A',
    email: 'ananya.iyer@campus.edu',
    phone: '+91 99014 55123',
    mentor: 'Dr. Anand Kumar (Prof & HOD)',
    academic: {
      cgpa: 9.12,
      internalMarksAvg: 92,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [9.0, 9.2, 9.15, 9.08, 9.14, 9.12],
      coreStrengths: ['Formal Methods', 'Compiler Design', 'Computer Networks'],
      academicRemarks: 'Academic topper with near-perfect lecture discipline, but severe placement interview stage fright.'
    },
    attendance: {
      overall: 94.0,
      theory: 95.0,
      lab: 92.0,
      consecutiveAbsences: 0,
      weeklyTrend: [95, 96, 94, 94, 93, 95, 94, 94.0],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 6.2,
      assignmentCompletionRate: 100,
      lateSubmissionsCount: 0,
      videoWatchHours: 58.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 22
    },
    engagement: {
      campusEventsAttended: 3,
      technicalClubs: ['CSI Student Chapter'],
      hackathonsParticipated: 1,
      hackathonWins: 0,
      certifications: ['NPTEL Gold Medalist - Algorithms'],
      leadershipRoles: 'Class Representative'
    },
    placement: {
      aptitudeScore: 56,
      codingScore: 51,
      mockInterviewScore: 48,
      resumeScore: 65,
      tierEligibility: 'Vulnerable in Placement Drives'
    },
    skills: {
      technical: { dsa: 58, webCloud: 45, dbSystem: 80, problemSolving: 55 },
      soft: { communication: 52, teamwork: 70, criticalThinking: 85, leadership: 60 }
    },
    feedback: {
      studentSatisfaction: 4.1,
      stressLevel: 'High',
      sentiment: 'High Academic Confidence, High Placement Anxiety',
      facultyFeedbackNotes: [
        'Flawless theoretical papers and textbook answers.',
        'Struggled severely in timed LeetCode assessments and cracked under live interviewer pressure.'
      ]
    }
  },
  {
    id: 'STU-1004',
    usn: '1RV22EC055',
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Electronics & Communication',
    semester: 5,
    section: 'C',
    email: 'siddharth.rao@campus.edu',
    phone: '+91 98860 11984',
    mentor: 'Prof. Meenakshi Sundaram',
    academic: {
      cgpa: 6.18,
      internalMarksAvg: 58,
      backlogs: 1,
      failedSubjects: ['Signals & Systems'],
      semesterHistory: [8.1, 7.8, 7.1, 6.4, 6.18],
      coreStrengths: ['Hardware Tinkering', 'Robotics Basics'],
      academicRemarks: 'Drastic downward semester trend from 8.1 in Sem 1 down to 6.18 in Sem 5. Silent withdrawal signs.'
    },
    attendance: {
      overall: 71.4,
      theory: 68.0,
      lab: 78.0,
      consecutiveAbsences: 5,
      weeklyTrend: [84, 80, 77, 74, 71, 69, 70, 71.4],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 1.2,
      assignmentCompletionRate: 48,
      lateSubmissionsCount: 5,
      videoWatchHours: 6.5,
      lastActiveDaysAgo: 16,
      forumInteractions: 0
    },
    engagement: {
      campusEventsAttended: 1,
      technicalClubs: [],
      hackathonsParticipated: 0,
      hackathonWins: 0,
      certifications: [],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 60,
      codingScore: 52,
      mockInterviewScore: 50,
      resumeScore: 55,
      tierEligibility: 'Needs Remedial Training'
    },
    skills: {
      technical: { dsa: 46, webCloud: 40, dbSystem: 50, problemSolving: 48 },
      soft: { communication: 58, teamwork: 52, criticalThinking: 60, leadership: 45 }
    },
    feedback: {
      studentSatisfaction: 2.0,
      stressLevel: 'High',
      sentiment: 'Burnout / Disengaged',
      facultyFeedbackNotes: [
        'Reported family distress earlier in the term; student has become withdrawn.',
        'Has missed the last 3 LMS module deadlines without providing medical or proctor notes.'
      ]
    }
  },
  {
    id: 'STU-1005',
    usn: '1RV21CS112',
    name: 'Tanvi Patel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'A',
    email: 'tanvi.patel@campus.edu',
    phone: '+91 97315 67890',
    mentor: 'Dr. Anand Kumar (Prof & HOD)',
    academic: {
      cgpa: 9.48,
      internalMarksAvg: 96,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [9.3, 9.4, 9.45, 9.5, 9.46, 9.48],
      coreStrengths: ['Distributed Systems', 'Cloud Computing', 'Data Structures & Algorithms'],
      academicRemarks: 'Exemplary campus star. High academic mastery combined with industry-standard engineering skills.'
    },
    attendance: {
      overall: 96.5,
      theory: 97.0,
      lab: 95.0,
      consecutiveAbsences: 0,
      weeklyTrend: [97, 98, 96, 96, 97, 95, 96, 96.5],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 7.5,
      assignmentCompletionRate: 100,
      lateSubmissionsCount: 0,
      videoWatchHours: 62.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 38
    },
    engagement: {
      campusEventsAttended: 8,
      technicalClubs: ['Google Developer Student Club (Lead)', 'Women in Tech'],
      hackathonsParticipated: 5,
      hackathonWins: 3,
      certifications: ['AWS Certified Solutions Architect', 'Google Cloud Associate Engineer'],
      leadershipRoles: 'GDSC Lead & Placement Representative'
    },
    placement: {
      aptitudeScore: 96,
      codingScore: 98,
      mockInterviewScore: 94,
      resumeScore: 96,
      tierEligibility: 'Tier 1 Super Dream (>20 LPA)'
    },
    skills: {
      technical: { dsa: 98, webCloud: 95, dbSystem: 92, problemSolving: 97 },
      soft: { communication: 94, teamwork: 96, criticalThinking: 95, leadership: 96 }
    },
    feedback: {
      studentSatisfaction: 4.9,
      stressLevel: 'Low',
      sentiment: 'Highly Motivated & Thriving',
      facultyFeedbackNotes: [
        'Outstanding student role model; assists peers with technical debugging.',
        'Cleared Goldman Sachs & Microsoft pre-placement interviews with top tier feedback.'
      ]
    }
  },
  {
    id: 'STU-1006',
    usn: '1RV22AI034',
    name: 'Kavya Nambiar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'AI & Data Science',
    semester: 5,
    section: 'A',
    email: 'kavya.nambiar@campus.edu',
    phone: '+91 96112 34567',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 8.72,
      internalMarksAvg: 88,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [8.5, 8.6, 8.8, 8.7, 8.72],
      coreStrengths: ['Natural Language Processing', 'Linear Algebra', 'Data Analytics'],
      academicRemarks: 'Consistent high performer with solid theoretical foundations and disciplined study habits.'
    },
    attendance: {
      overall: 89.4,
      theory: 88.0,
      lab: 92.0,
      consecutiveAbsences: 0,
      weeklyTrend: [92, 90, 88, 89, 90, 89, 88, 89.4],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 5.4,
      assignmentCompletionRate: 94,
      lateSubmissionsCount: 1,
      videoWatchHours: 42.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 18
    },
    engagement: {
      campusEventsAttended: 4,
      technicalClubs: ['Data Science Club', 'Rotaract'],
      hackathonsParticipated: 2,
      hackathonWins: 1,
      certifications: ['IBM Data Science Professional', 'Kaggle Competitions Master'],
      leadershipRoles: 'Event Coordinator'
    },
    placement: {
      aptitudeScore: 84,
      codingScore: 82,
      mockInterviewScore: 85,
      resumeScore: 89,
      tierEligibility: 'Tier 1 Product Eligible'
    },
    skills: {
      technical: { dsa: 82, webCloud: 79, dbSystem: 86, problemSolving: 85 },
      soft: { communication: 86, teamwork: 88, criticalThinking: 89, leadership: 82 }
    },
    feedback: {
      studentSatisfaction: 4.5,
      stressLevel: 'Low',
      sentiment: 'Enthusiastic & Well Balanced',
      facultyFeedbackNotes: [
        'Consistently tops research paper reviews in AI coursework.',
        'Collaborative spirit and proactive in group lab projects.'
      ]
    }
  },
  {
    id: 'STU-1007',
    usn: '1RV22EC012',
    name: 'Arjun Namboodiri',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Electronics & Communication',
    semester: 5,
    section: 'A',
    email: 'arjun.n@campus.edu',
    phone: '+91 94480 91234',
    mentor: 'Prof. Meenakshi Sundaram',
    academic: {
      cgpa: 5.88,
      internalMarksAvg: 56,
      backlogs: 2,
      failedSubjects: ['Microcontrollers & Embedded Systems', 'Analog Circuits'],
      semesterHistory: [6.9, 6.5, 6.1, 5.7, 5.88],
      coreStrengths: ['Basic Circuit Simulation'],
      academicRemarks: 'Multiple backlogs in hardware domains. Struggling with core electronics engineering modules.'
    },
    attendance: {
      overall: 66.8,
      theory: 62.5,
      lab: 75.0,
      consecutiveAbsences: 3,
      weeklyTrend: [78, 74, 71, 68, 65, 63, 64, 66.8],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 1.5,
      assignmentCompletionRate: 55,
      lateSubmissionsCount: 4,
      videoWatchHours: 9.8,
      lastActiveDaysAgo: 11,
      forumInteractions: 0
    },
    engagement: {
      campusEventsAttended: 1,
      technicalClubs: [],
      hackathonsParticipated: 0,
      hackathonWins: 0,
      certifications: [],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 50,
      codingScore: 45,
      mockInterviewScore: 46,
      resumeScore: 52,
      tierEligibility: 'Needs Remedial Training'
    },
    skills: {
      technical: { dsa: 40, webCloud: 35, dbSystem: 45, problemSolving: 42 },
      soft: { communication: 56, teamwork: 62, criticalThinking: 50, leadership: 45 }
    },
    feedback: {
      studentSatisfaction: 2.5,
      stressLevel: 'High',
      sentiment: 'Struggling with Core Subjects',
      facultyFeedbackNotes: [
        'Requires intensive remedial lab coaching on oscilloscope and microcontroller kits.',
        'Parent notified regarding consecutive absent days in September.'
      ]
    }
  },
  {
    id: 'STU-1008',
    usn: '1RV21CS067',
    name: 'Meera Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'B',
    email: 'meera.d@campus.edu',
    phone: '+91 98201 44556',
    mentor: 'Dr. Anand Kumar (Prof & HOD)',
    academic: {
      cgpa: 7.92,
      internalMarksAvg: 78,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.8, 7.9, 8.0, 7.85, 7.9, 7.92],
      coreStrengths: ['Web Development', 'API Design', 'Database Engineering'],
      academicRemarks: 'Solid and dependable performer across theory and practical assignments.'
    },
    attendance: {
      overall: 84.5,
      theory: 83.0,
      lab: 87.5,
      consecutiveAbsences: 1,
      weeklyTrend: [86, 85, 84, 83, 85, 84, 85, 84.5],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 4.8,
      assignmentCompletionRate: 88,
      lateSubmissionsCount: 1,
      videoWatchHours: 32.5,
      lastActiveDaysAgo: 2,
      forumInteractions: 12
    },
    engagement: {
      campusEventsAttended: 4,
      technicalClubs: ['Open Source Developers Circle'],
      hackathonsParticipated: 2,
      hackathonWins: 1,
      certifications: ['Full Stack React Developer', 'PostgreSQL Associate'],
      leadershipRoles: 'Club Webmaster'
    },
    placement: {
      aptitudeScore: 74,
      codingScore: 78,
      mockInterviewScore: 76,
      resumeScore: 82,
      tierEligibility: 'Tier 1 Ready'
    },
    skills: {
      technical: { dsa: 76, webCloud: 85, dbSystem: 84, problemSolving: 78 },
      soft: { communication: 80, teamwork: 85, criticalThinking: 82, leadership: 75 }
    },
    feedback: {
      studentSatisfaction: 4.0,
      stressLevel: 'Moderate',
      sentiment: 'Steady & Placement Ready',
      facultyFeedbackNotes: [
        'Good team worker; led capstone project delivery ahead of schedule.',
        'Technical mock interview cleared with strong marks in system architecture.'
      ]
    }
  },
  {
    id: 'STU-1009',
    usn: '1RV22AI051',
    name: 'Vikramaditya Sen',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'AI & Data Science',
    semester: 5,
    section: 'B',
    email: 'vikram.sen@campus.edu',
    phone: '+91 97115 67231',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 7.15,
      internalMarksAvg: 70,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.2, 7.3, 7.1, 7.0, 7.15],
      coreStrengths: ['Data Visualization', 'Python Scripting'],
      academicRemarks: 'Adequate academic performance; steady progress without notable peaks or backlogs.'
    },
    attendance: {
      overall: 78.5,
      theory: 76.0,
      lab: 84.0,
      consecutiveAbsences: 2,
      weeklyTrend: [82, 80, 78, 77, 78, 79, 78, 78.5],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 3.5,
      assignmentCompletionRate: 80,
      lateSubmissionsCount: 2,
      videoWatchHours: 24.0,
      lastActiveDaysAgo: 3,
      forumInteractions: 6
    },
    engagement: {
      campusEventsAttended: 3,
      technicalClubs: ['Robotics Club'],
      hackathonsParticipated: 1,
      hackathonWins: 0,
      certifications: ['Data Analysis with Python'],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 66,
      codingScore: 64,
      mockInterviewScore: 68,
      resumeScore: 72,
      tierEligibility: 'Tier 2 Ready'
    },
    skills: {
      technical: { dsa: 65, webCloud: 62, dbSystem: 70, problemSolving: 66 },
      soft: { communication: 70, teamwork: 74, criticalThinking: 68, leadership: 64 }
    },
    feedback: {
      studentSatisfaction: 3.5,
      stressLevel: 'Moderate',
      sentiment: 'Satisfactory',
      facultyFeedbackNotes: [
        'Regular in lab submissions. Could benefit from competitive coding practice to break into Tier 1.'
      ]
    }
  },
  {
    id: 'STU-1010',
    usn: '1RV21CS015',
    name: 'Aditya Nair',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'A',
    email: 'aditya.nair@campus.edu',
    phone: '+91 99452 77811',
    mentor: 'Dr. S. K. Narayanan (Assoc. Prof)',
    academic: {
      cgpa: 8.85,
      internalMarksAvg: 89,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [8.6, 8.7, 8.8, 8.9, 8.8, 8.85],
      coreStrengths: ['Algorithms', 'Operating Systems', 'Object Oriented Design'],
      academicRemarks: 'Strong academic pedigree. Great grasp of algorithmic theory and systems programming.'
    },
    attendance: {
      overall: 91.2,
      theory: 90.0,
      lab: 93.5,
      consecutiveAbsences: 0,
      weeklyTrend: [93, 92, 91, 91, 90, 92, 91, 91.2],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 5.8,
      assignmentCompletionRate: 98,
      lateSubmissionsCount: 0,
      videoWatchHours: 48.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 25
    },
    engagement: {
      campusEventsAttended: 5,
      technicalClubs: ['ACM Student Chapter', 'Coding Ninjas'],
      hackathonsParticipated: 3,
      hackathonWins: 2,
      certifications: ['Oracle Certified Java Professional', 'Coursera Cloud Specialization'],
      leadershipRoles: 'ACM Vice Chair'
    },
    placement: {
      aptitudeScore: 88,
      codingScore: 92,
      mockInterviewScore: 86,
      resumeScore: 90,
      tierEligibility: 'Tier 1 Product Eligible'
    },
    skills: {
      technical: { dsa: 94, webCloud: 82, dbSystem: 88, problemSolving: 92 },
      soft: { communication: 84, teamwork: 90, criticalThinking: 92, leadership: 86 }
    },
    feedback: {
      studentSatisfaction: 4.7,
      stressLevel: 'Low',
      sentiment: 'High Performing & Career Focused',
      facultyFeedbackNotes: [
        'Top candidate for elite product campus drives.',
        'Demonstrates exceptional problem-solving speed under pressure.'
      ]
    }
  },
  {
    id: 'STU-1011',
    usn: '1RV22EC089',
    name: 'Deepika Swaminathan',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'Electronics & Communication',
    semester: 5,
    section: 'B',
    email: 'deepika.s@campus.edu',
    phone: '+91 98801 33221',
    mentor: 'Prof. Meenakshi Sundaram',
    academic: {
      cgpa: 7.64,
      internalMarksAvg: 75,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.4, 7.5, 7.6, 7.7, 7.64],
      coreStrengths: ['VLSI Design', 'Digital Signal Processing'],
      academicRemarks: 'Diligent worker with genuine interest in semiconductor and VLSI layout design.'
    },
    attendance: {
      overall: 87.0,
      theory: 86.0,
      lab: 89.0,
      consecutiveAbsences: 1,
      weeklyTrend: [88, 87, 86, 86, 88, 87, 87, 87.0],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 4.2,
      assignmentCompletionRate: 90,
      lateSubmissionsCount: 1,
      videoWatchHours: 29.0,
      lastActiveDaysAgo: 2,
      forumInteractions: 9
    },
    engagement: {
      campusEventsAttended: 3,
      technicalClubs: ['IEEE Student Branch'],
      hackathonsParticipated: 1,
      hackathonWins: 0,
      certifications: ['Verilog HDL for FPGA Design'],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 72,
      codingScore: 68,
      mockInterviewScore: 74,
      resumeScore: 78,
      tierEligibility: 'Tier 1 Core Tech Ready'
    },
    skills: {
      technical: { dsa: 68, webCloud: 55, dbSystem: 65, problemSolving: 72 },
      soft: { communication: 78, teamwork: 82, criticalThinking: 76, leadership: 70 }
    },
    feedback: {
      studentSatisfaction: 4.2,
      stressLevel: 'Moderate',
      sentiment: 'Positive & Disciplined',
      facultyFeedbackNotes: [
        'Consistently tops FPGA synthesis lab assignments.',
        'Targeting semiconductor core recruitment drives (Texas Instruments, Qualcomm).'
      ]
    }
  },
  {
    id: 'STU-1012',
    usn: '1RV22CS130',
    name: 'Karan Singhania',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 5,
    section: 'C',
    email: 'karan.s@campus.edu',
    phone: '+91 97401 99283',
    mentor: 'Dr. S. K. Narayanan (Assoc. Prof)',
    academic: {
      cgpa: 5.60,
      internalMarksAvg: 52,
      backlogs: 3,
      failedSubjects: ['Data Structures & Applications', 'Computer Organization', 'Discrete Mathematics'],
      semesterHistory: [6.5, 5.9, 5.7, 5.5, 5.60],
      coreStrengths: ['Gaming Enthusiast'],
      academicRemarks: 'Critical academic probation warning: 3 uncleared course backlogs across 2nd & 3rd semesters.'
    },
    attendance: {
      overall: 58.2,
      theory: 54.0,
      lab: 66.0,
      consecutiveAbsences: 6,
      weeklyTrend: [70, 66, 62, 59, 57, 56, 57, 58.2],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 0.8,
      assignmentCompletionRate: 35,
      lateSubmissionsCount: 7,
      videoWatchHours: 4.2,
      lastActiveDaysAgo: 21,
      forumInteractions: 0
    },
    engagement: {
      campusEventsAttended: 0,
      technicalClubs: [],
      hackathonsParticipated: 0,
      hackathonWins: 0,
      certifications: [],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 42,
      codingScore: 36,
      mockInterviewScore: 35,
      resumeScore: 40,
      tierEligibility: 'Ineligible for Campus Placements'
    },
    skills: {
      technical: { dsa: 32, webCloud: 38, dbSystem: 34, problemSolving: 35 },
      soft: { communication: 50, teamwork: 48, criticalThinking: 42, leadership: 35 }
    },
    feedback: {
      studentSatisfaction: 1.8,
      stressLevel: 'High',
      sentiment: 'Severe Disengagement',
      facultyFeedbackNotes: [
        'Absence notice mailed to parents twice; no response received to date.',
        'Missed two compulsory mid-term examinations; requires immediate administrative intervention.'
      ]
    }
  },
  {
    id: 'STU-1013',
    usn: '1RV22AI062',
    name: 'Sneha Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'AI & Data Science',
    semester: 5,
    section: 'A',
    email: 'sneha.k@campus.edu',
    phone: '+91 98865 43210',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 8.35,
      internalMarksAvg: 84,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [8.1, 8.2, 8.4, 8.3, 8.35],
      coreStrengths: ['Computer Vision', 'Data Mining', 'SQL'],
      academicRemarks: 'Very steady academic performer. Reliable lab partner with good project presentation skills.'
    },
    attendance: {
      overall: 88.6,
      theory: 87.0,
      lab: 91.0,
      consecutiveAbsences: 0,
      weeklyTrend: [90, 89, 88, 88, 89, 88, 88, 88.6],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 4.6,
      assignmentCompletionRate: 92,
      lateSubmissionsCount: 1,
      videoWatchHours: 36.0,
      lastActiveDaysAgo: 2,
      forumInteractions: 11
    },
    engagement: {
      campusEventsAttended: 4,
      technicalClubs: ['AI Society', 'Literary Club'],
      hackathonsParticipated: 2,
      hackathonWins: 0,
      certifications: ['TensorFlow in Practice Specialization'],
      leadershipRoles: 'Newsletter Editor'
    },
    placement: {
      aptitudeScore: 80,
      codingScore: 76,
      mockInterviewScore: 82,
      resumeScore: 84,
      tierEligibility: 'Tier 1 Product Eligible'
    },
    skills: {
      technical: { dsa: 75, webCloud: 72, dbSystem: 85, problemSolving: 78 },
      soft: { communication: 88, teamwork: 85, criticalThinking: 82, leadership: 80 }
    },
    feedback: {
      studentSatisfaction: 4.4,
      stressLevel: 'Low',
      sentiment: 'Well Balanced & Confident',
      facultyFeedbackNotes: [
        'Presented well in the National Student Data Science Symposium.',
        'Good verbal articulation during design reviews.'
      ]
    }
  },
  {
    id: 'STU-1014',
    usn: '1RV21CS099',
    name: 'Tarun Varma',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'B',
    email: 'tarun.varma@campus.edu',
    phone: '+91 97312 00192',
    mentor: 'Dr. Anand Kumar (Prof & HOD)',
    academic: {
      cgpa: 7.45,
      internalMarksAvg: 72,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.2, 7.3, 7.4, 7.5, 7.42, 7.45],
      coreStrengths: ['DevOps', 'Docker', 'Linux Administration'],
      academicRemarks: 'Decent overall academic performance. Highly proactive in infrastructure automation projects.'
    },
    attendance: {
      overall: 81.0,
      theory: 79.0,
      lab: 86.0,
      consecutiveAbsences: 1,
      weeklyTrend: [83, 82, 81, 80, 81, 81, 80, 81.0],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 3.9,
      assignmentCompletionRate: 85,
      lateSubmissionsCount: 2,
      videoWatchHours: 28.0,
      lastActiveDaysAgo: 3,
      forumInteractions: 8
    },
    engagement: {
      campusEventsAttended: 3,
      technicalClubs: ['Linux Users Group', 'Cyber Security Club'],
      hackathonsParticipated: 2,
      hackathonWins: 1,
      certifications: ['CKA: Certified Kubernetes Administrator'],
      leadershipRoles: 'SysAdmin Volunteer'
    },
    placement: {
      aptitudeScore: 76,
      codingScore: 74,
      mockInterviewScore: 78,
      resumeScore: 82,
      tierEligibility: 'Tier 1 Tech Ready'
    },
    skills: {
      technical: { dsa: 72, webCloud: 88, dbSystem: 75, problemSolving: 76 },
      soft: { communication: 75, teamwork: 84, criticalThinking: 80, leadership: 74 }
    },
    feedback: {
      studentSatisfaction: 4.1,
      stressLevel: 'Moderate',
      sentiment: 'Constructive & Pragmatic',
      facultyFeedbackNotes: [
        'Maintains the department lab server cluster voluntarily.',
        'High aptitude for Site Reliability Engineering roles.'
      ]
    }
  },
  {
    id: 'STU-1015',
    usn: '1RV22EC044',
    name: 'Nikhil Kashyap',
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Electronics & Communication',
    semester: 5,
    section: 'A',
    email: 'nikhil.k@campus.edu',
    phone: '+91 94812 66782',
    mentor: 'Prof. Meenakshi Sundaram',
    academic: {
      cgpa: 8.65,
      internalMarksAvg: 86,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [8.4, 8.5, 8.7, 8.6, 8.65],
      coreStrengths: ['Digital Signal Processing', 'Wireless Communication'],
      academicRemarks: 'Strong analytical math capabilities; high test scores across complex mathematical courses.'
    },
    attendance: {
      overall: 92.5,
      theory: 91.0,
      lab: 95.0,
      consecutiveAbsences: 0,
      weeklyTrend: [94, 93, 92, 92, 93, 92, 93, 92.5],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 5.2,
      assignmentCompletionRate: 96,
      lateSubmissionsCount: 0,
      videoWatchHours: 41.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 19
    },
    engagement: {
      campusEventsAttended: 5,
      technicalClubs: ['IEEE Signal Processing Society'],
      hackathonsParticipated: 2,
      hackathonWins: 1,
      certifications: ['MATLAB Certified Associate'],
      leadershipRoles: 'Student Treasurer'
    },
    placement: {
      aptitudeScore: 90,
      codingScore: 78,
      mockInterviewScore: 84,
      resumeScore: 86,
      tierEligibility: 'Tier 1 Core Tech Ready'
    },
    skills: {
      technical: { dsa: 76, webCloud: 62, dbSystem: 70, problemSolving: 88 },
      soft: { communication: 82, teamwork: 86, criticalThinking: 90, leadership: 80 }
    },
    feedback: {
      studentSatisfaction: 4.6,
      stressLevel: 'Low',
      sentiment: 'Highly Capable & Enthusiastic',
      facultyFeedbackNotes: [
        'Top rank in communication theory; recommended for Qualcomm core research internship.'
      ]
    }
  },
  {
    id: 'STU-1016',
    usn: '1RV22AI005',
    name: 'Aishwarya Joshi',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'AI & Data Science',
    semester: 5,
    section: 'A',
    email: 'aishwarya.j@campus.edu',
    phone: '+91 99008 12399',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 9.20,
      internalMarksAvg: 93,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [9.0, 9.1, 9.3, 9.25, 9.20],
      coreStrengths: ['Reinforcement Learning', 'Applied Statistics', 'Optimization'],
      academicRemarks: 'Department rank 2. Co-authored an IEEE conference workshop paper on reinforcement learning.'
    },
    attendance: {
      overall: 95.0,
      theory: 94.0,
      lab: 97.0,
      consecutiveAbsences: 0,
      weeklyTrend: [96, 95, 95, 94, 96, 95, 95, 95.0],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 6.8,
      assignmentCompletionRate: 100,
      lateSubmissionsCount: 0,
      videoWatchHours: 54.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 31
    },
    engagement: {
      campusEventsAttended: 7,
      technicalClubs: ['AI Society (Secretary)', 'ACM-W'],
      hackathonsParticipated: 4,
      hackathonWins: 2,
      certifications: ['Stanford Deep Learning Specialization', 'NVIDIA DLI Certificate'],
      leadershipRoles: 'ACM-W Secretary'
    },
    placement: {
      aptitudeScore: 92,
      codingScore: 90,
      mockInterviewScore: 92,
      resumeScore: 94,
      tierEligibility: 'Tier 1 Super Dream (>20 LPA)'
    },
    skills: {
      technical: { dsa: 92, webCloud: 84, dbSystem: 88, problemSolving: 94 },
      soft: { communication: 90, teamwork: 92, criticalThinking: 95, leadership: 90 }
    },
    feedback: {
      studentSatisfaction: 4.8,
      stressLevel: 'Low',
      sentiment: 'Outstanding Scholar',
      facultyFeedbackNotes: [
        'Brilliant academic precision. Mentors juniors in mathematical modeling.',
        'Selected for international symposium travel grant.'
      ]
    }
  },
  {
    id: 'STU-1017',
    usn: '1RV21CS034',
    name: 'Devashish Pandey',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'B',
    email: 'devashish.p@campus.edu',
    phone: '+91 98450 44991',
    mentor: 'Dr. S. K. Narayanan (Assoc. Prof)',
    academic: {
      cgpa: 6.80,
      internalMarksAvg: 68,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.0, 7.1, 6.9, 6.7, 6.85, 6.80],
      coreStrengths: ['Mobile App Development', 'Flutter'],
      academicRemarks: 'Borderline CGPA for Tier-1 companies (6.8 vs 7.0 cutoff). Needs minor boost to unlock placement pools.'
    },
    attendance: {
      overall: 79.2,
      theory: 78.0,
      lab: 82.0,
      consecutiveAbsences: 1,
      weeklyTrend: [82, 80, 79, 78, 80, 79, 79, 79.2],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 3.2,
      assignmentCompletionRate: 78,
      lateSubmissionsCount: 2,
      videoWatchHours: 20.0,
      lastActiveDaysAgo: 4,
      forumInteractions: 5
    },
    engagement: {
      campusEventsAttended: 3,
      technicalClubs: ['Mobile Apps Lab'],
      hackathonsParticipated: 2,
      hackathonWins: 0,
      certifications: ['Google Associate Android Developer'],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 68,
      codingScore: 72,
      mockInterviewScore: 70,
      resumeScore: 75,
      tierEligibility: 'Tier 2 Ready'
    },
    skills: {
      technical: { dsa: 70, webCloud: 76, dbSystem: 72, problemSolving: 71 },
      soft: { communication: 74, teamwork: 76, criticalThinking: 72, leadership: 68 }
    },
    feedback: {
      studentSatisfaction: 3.6,
      stressLevel: 'Moderate',
      sentiment: 'Motivated but Needs Polish',
      facultyFeedbackNotes: [
        'If CGPA reaches 7.0 in the upcoming 7th sem exams, eligibility expands from 40% to 85% of visiting companies.'
      ]
    }
  },
  {
    id: 'STU-1018',
    usn: '1RV22EC071',
    name: 'Harini Sundaram',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'Electronics & Communication',
    semester: 5,
    section: 'C',
    email: 'harini.s@campus.edu',
    phone: '+91 97110 33812',
    mentor: 'Prof. Meenakshi Sundaram',
    academic: {
      cgpa: 5.92,
      internalMarksAvg: 58,
      backlogs: 1,
      failedSubjects: ['Linear Integrated Circuits'],
      semesterHistory: [6.8, 6.4, 6.2, 5.9, 5.92],
      coreStrengths: ['Robotics Sensor Interfacing'],
      academicRemarks: '1 active backlog. Attendance dipped below 75% in the midterm period due to medical illness.'
    },
    attendance: {
      overall: 73.8,
      theory: 71.0,
      lab: 80.0,
      consecutiveAbsences: 2,
      weeklyTrend: [80, 77, 75, 72, 70, 72, 73, 73.8],
      warningIssued: true
    },
    lms: {
      loginFrequencyPerWeek: 2.1,
      assignmentCompletionRate: 64,
      lateSubmissionsCount: 3,
      videoWatchHours: 15.0,
      lastActiveDaysAgo: 7,
      forumInteractions: 2
    },
    engagement: {
      campusEventsAttended: 2,
      technicalClubs: ['Robotics Club'],
      hackathonsParticipated: 1,
      hackathonWins: 0,
      certifications: [],
      leadershipRoles: 'None'
    },
    placement: {
      aptitudeScore: 58,
      codingScore: 50,
      mockInterviewScore: 54,
      resumeScore: 60,
      tierEligibility: 'Needs Remedial Training'
    },
    skills: {
      technical: { dsa: 48, webCloud: 42, dbSystem: 52, problemSolving: 54 },
      soft: { communication: 65, teamwork: 70, criticalThinking: 58, leadership: 52 }
    },
    feedback: {
      studentSatisfaction: 3.0,
      stressLevel: 'Moderate',
      sentiment: 'Recovering after Health Setback',
      facultyFeedbackNotes: [
        'Medical certificate verified for 2 weeks in August. Student is catching up on missed lab assignments.'
      ]
    }
  },
  {
    id: 'STU-1019',
    usn: '1RV21CS048',
    name: 'Gaurav Bhatia',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 7,
    section: 'A',
    email: 'gaurav.b@campus.edu',
    phone: '+91 99801 77334',
    mentor: 'Dr. Anand Kumar (Prof & HOD)',
    academic: {
      cgpa: 8.40,
      internalMarksAvg: 85,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [8.2, 8.3, 8.5, 8.4, 8.45, 8.40],
      coreStrengths: ['Cybersecurity', 'Network Forensics', 'Cryptography'],
      academicRemarks: 'Proficient security researcher. High academic integrity and keen analytical eye.'
    },
    attendance: {
      overall: 89.0,
      theory: 88.0,
      lab: 91.5,
      consecutiveAbsences: 0,
      weeklyTrend: [91, 90, 89, 88, 89, 90, 89, 89.0],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 5.1,
      assignmentCompletionRate: 95,
      lateSubmissionsCount: 0,
      videoWatchHours: 38.0,
      lastActiveDaysAgo: 1,
      forumInteractions: 16
    },
    engagement: {
      campusEventsAttended: 5,
      technicalClubs: ['Capture the Flag (CTF) Club', 'Nullcon Chapter'],
      hackathonsParticipated: 3,
      hackathonWins: 2,
      certifications: ['CompTIA Security+', 'CEH: Certified Ethical Hacker'],
      leadershipRoles: 'CTF Team Captain'
    },
    placement: {
      aptitudeScore: 86,
      codingScore: 84,
      mockInterviewScore: 88,
      resumeScore: 91,
      tierEligibility: 'Tier 1 Product Eligible'
    },
    skills: {
      technical: { dsa: 82, webCloud: 84, dbSystem: 80, problemSolving: 88 },
      soft: { communication: 82, teamwork: 88, criticalThinking: 92, leadership: 85 }
    },
    feedback: {
      studentSatisfaction: 4.6,
      stressLevel: 'Low',
      sentiment: 'Highly Driven & Security Specialist',
      facultyFeedbackNotes: [
        'Discovered and reported a security bug in campus examination portal under responsible disclosure.',
        'High potential for cybersecurity consulting and security engineering roles.'
      ]
    }
  },
  {
    id: 'STU-1020',
    usn: '1RV22AI077',
    name: 'Pooja Hegde',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    department: 'AI & Data Science',
    semester: 5,
    section: 'B',
    email: 'pooja.hegde@campus.edu',
    phone: '+91 96201 55667',
    mentor: 'Dr. Radhika K. (Prof)',
    academic: {
      cgpa: 7.82,
      internalMarksAvg: 79,
      backlogs: 0,
      failedSubjects: [],
      semesterHistory: [7.6, 7.7, 7.9, 7.8, 7.82],
      coreStrengths: ['Predictive Modeling', 'Tableau', 'Business Analytics'],
      academicRemarks: 'Very good business intelligence analyst mindset. Combines quantitative skills with product vision.'
    },
    attendance: {
      overall: 86.4,
      theory: 85.0,
      lab: 89.0,
      consecutiveAbsences: 0,
      weeklyTrend: [88, 87, 86, 85, 87, 86, 86, 86.4],
      warningIssued: false
    },
    lms: {
      loginFrequencyPerWeek: 4.5,
      assignmentCompletionRate: 90,
      lateSubmissionsCount: 1,
      videoWatchHours: 31.0,
      lastActiveDaysAgo: 2,
      forumInteractions: 10
    },
    engagement: {
      campusEventsAttended: 4,
      technicalClubs: ['Analytics Society', 'Toastmasters'],
      hackathonsParticipated: 2,
      hackathonWins: 1,
      certifications: ['Tableau Desktop Specialist', 'Google Business Intelligence'],
      leadershipRoles: 'Toastmasters VP Education'
    },
    placement: {
      aptitudeScore: 82,
      codingScore: 70,
      mockInterviewScore: 88,
      resumeScore: 85,
      tierEligibility: 'Tier 1 Product/Consulting Eligible'
    },
    skills: {
      technical: { dsa: 70, webCloud: 68, dbSystem: 84, problemSolving: 76 },
      soft: { communication: 92, teamwork: 90, criticalThinking: 86, leadership: 88 }
    },
    feedback: {
      studentSatisfaction: 4.5,
      stressLevel: 'Low',
      sentiment: 'Confident & Eloquent Speaker',
      facultyFeedbackNotes: [
        'Exceptional communication and presentation skills in mock consulting case studies.'
      ]
    }
  }
];

// Helper to get all students enriched with analytics, risk scores, cohort, and XAI explainability
import { calculateStudentMetrics } from '../utils/analyticsEngine';
import { classifyStudentCohort } from '../utils/segmentation';
import { explainStudentScore } from '../utils/explainability';

export function getEnrichedStudents() {
  const getDepartmentSubjects = (dept, sem) => {
    if (dept.includes('AI')) {
      return [
        { code: 'AI501', name: 'Deep Learning & Neural Networks', type: 'Theory', credits: 4 },
        { code: 'AI502', name: 'Natural Language Processing', type: 'Theory', credits: 4 },
        { code: 'AI503', name: 'Big Data & Cloud Systems', type: 'Theory', credits: 3 },
        { code: 'AI504', name: 'Reinforcement Learning', type: 'Theory', credits: 3 },
        { code: 'AIL505', name: 'Deep Learning & PyTorch Lab', type: 'Lab', credits: 1.5 },
        { code: 'AIL506', name: 'Data Visualization & Tableau Lab', type: 'Lab', credits: 1.5 }
      ];
    } else if (dept.includes('Electronics')) {
      return [
        { code: 'EC501', name: 'Digital Signal Processing', type: 'Theory', credits: 4 },
        { code: 'EC502', name: 'VLSI Design & Architecture', type: 'Theory', credits: 4 },
        { code: 'EC503', name: 'Microcontrollers & Embedded IoT', type: 'Theory', credits: 3 },
        { code: 'EC504', name: 'Linear Integrated Circuits', type: 'Theory', credits: 3 },
        { code: 'ECL505', name: 'DSP Simulation Lab', type: 'Lab', credits: 1.5 },
        { code: 'ECL506', name: 'Embedded Systems Lab', type: 'Lab', credits: 1.5 }
      ];
    } else {
      // Default CSE
      return [
        { code: 'CS501', name: 'Automata Theory & Computability', type: 'Theory', credits: 4 },
        { code: 'CS502', name: 'Database Management Systems', type: 'Theory', credits: 4 },
        { code: 'CS503', name: 'Computer Networks', type: 'Theory', credits: 3 },
        { code: 'CS504', name: 'Design & Analysis of Algorithms', type: 'Theory', credits: 3 },
        { code: 'CSL505', name: 'Full Stack Web Lab', type: 'Lab', credits: 1.5 },
        { code: 'CSL506', name: 'DBMS & SQL Query Lab', type: 'Lab', credits: 1.5 }
      ];
    }
  };

  return INITIAL_STUDENTS.map(student => {
    const metrics = calculateStudentMetrics(student);
    const cohort = classifyStudentCohort(student, metrics);
    const explanation = explainStudentScore(student, metrics);

    // Generate subject performance & subject-wise attendance based on actual student academic standing
    const subjects = getDepartmentSubjects(student.department, student.semester);
    const failedNames = student.academic.failedSubjects || [];
    const baseCgpa = student.academic.cgpa;
    const baseAtt = student.attendance.overall;

    const subjectPerformance = subjects.map((sub, i) => {
      const isFailed = failedNames.some(f => sub.name.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(sub.name.toLowerCase())) || 
                       (i < student.academic.backlogs && student.academic.backlogs > 0);
      
      let marks = Math.round(baseCgpa * 9.5 + (i % 2 === 0 ? 3 : -3) + (Math.sin(i) * 4));
      marks = Math.min(98, Math.max(35, marks));
      let grade = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : marks >= 60 ? 'B' : marks >= 50 ? 'C' : 'P';
      let status = 'Passed';

      if (isFailed) {
        marks = Math.min(42, Math.max(28, marks - 25));
        grade = 'F (Backlog)';
        status = 'Backlog (Remedial)';
      }

      return {
        code: sub.code,
        name: sub.name,
        type: sub.type,
        credits: sub.credits,
        internalMarks: marks,
        maxMarks: 100,
        grade,
        status
      };
    });

    const subjectAttendance = subjects.map((sub, i) => {
      const totalHours = sub.type === 'Lab' ? 24 : 42;
      const variation = (i % 2 === 0 ? 2.5 : -3.2) + (sub.type === 'Lab' ? 4 : -2);
      let pct = Math.min(98, Math.max(45, baseAtt + variation));
      pct = Math.round(pct * 10) / 10;
      const attended = Math.round((pct / 100) * totalHours);
      const belowCutoff = pct < 75;

      return {
        code: sub.code,
        name: sub.name,
        type: sub.type,
        attended,
        total: totalHours,
        percentage: pct,
        belowCutoff
      };
    });

    return {
      ...student,
      academic: {
        ...student.academic,
        subjectPerformance
      },
      attendance: {
        ...student.attendance,
        subjectAttendance
      },
      metrics,
      cohort,
      explanation
    };
  });
}

