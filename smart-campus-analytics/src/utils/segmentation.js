/**
 * Bonus Credit: Student Segmentation Engine
 * Groups students into 5 actionable behavioral clusters to support targeted campus interventions:
 * 1. Campus Champions (High Academic, High Placement, High Engagement)
 * 2. Placement Vulnerable (High Academic, Low Technical/Aptitude Readiness)
 * 3. Talented Coders in Academic Slump (High Tech Skills, Low Attendance/CGPA)
 * 4. Disengaged & Inactive (LMS Ghosting, Sliding Attendance, Low Wellbeing)
 * 5. Multi-Pillar Critical (At risk across academics, attendance, and placement)
 */

export const COHORTS = {
  CHAMPIONS: {
    id: 'CHAMPIONS',
    name: 'Campus Champions',
    badge: 'High Achiever',
    color: 'indigo',
    icon: 'Trophy',
    description: 'High CGPA, strong coding skills, active in hackathons and campus clubs. Ready for Tier 1 product placements and leadership roles.',
    recommendedAction: 'Nominate for elite scholarship programs, campus leadership, and mentor roles for junior cohorts.'
  },
  PLACEMENT_VULNERABLE: {
    id: 'PLACEMENT_VULNERABLE',
    name: 'Placement Vulnerable',
    badge: 'Aptitude/Coding Gap',
    color: 'amber',
    icon: 'Briefcase',
    description: 'Good academic standing & high attendance, but struggling with coding assessments, algorithmic problem solving, and mock interviews.',
    recommendedAction: 'Enroll in Intensive Placement Boot Camp, pair with coding mentors, and schedule recurring technical mock interviews.'
  },
  CODER_ACADEMIC_SLUMP: {
    id: 'CODER_ACADEMIC_SLUMP',
    name: 'Tech Star with Academic Slump',
    badge: 'Attendance/GPA Slump',
    color: 'cyan',
    icon: 'Code',
    description: 'Exceptional coding and hackathon performance, but neglecting coursework, missing classes, and carrying borderline theory marks.',
    recommendedAction: 'Schedule Academic Advisor check-in to negotiate attendance recovery and guide balanced preparation for core theory exams.'
  },
  DISENGAGED_INACTIVE: {
    id: 'DISENGAGED_INACTIVE',
    name: 'Disengaged / Silent Dropout Risk',
    badge: 'LMS & Attendance Drop',
    color: 'orange',
    icon: 'UserX',
    description: 'Sharp drop in LMS login frequency, missed assignments, low attendance, and high stress or low satisfaction.',
    recommendedAction: 'Initiate Student Wellness & Mental Health check-in, assign peer buddy, and notify faculty proctor immediately.'
  },
  CRITICAL_MULTI_PILLAR: {
    id: 'CRITICAL_MULTI_PILLAR',
    name: 'Critical Multi-Pillar Crisis',
    badge: 'Urgent Intervention Needed',
    color: 'rose',
    icon: 'AlertTriangle',
    description: 'Multiple active backlogs, attendance < 75%, poor placement scores, and low overall engagement. Immediate academic probation risk.',
    recommendedAction: 'Convene immediate Parent-Proctor Conference, formulate Remedial Study Contract, and mandate attendance tracking.'
  }
};

/**
 * Assigns each student to their most fitting behavioral cohort
 */
export function classifyStudentCohort(student, metrics) {
  const { pillarScores, risks } = metrics;
  const isHighAcademic = student.academic.cgpa >= 8.0 && student.academic.backlogs === 0;
  const isLowAcademic = student.academic.cgpa < 6.5 || student.academic.backlogs > 0;
  const isHighCoding = student.placement.codingScore >= 78;
  const isLowPlacement = student.placement.codingScore < 60 || student.placement.aptitudeScore < 60;
  const isLowAttendance = student.attendance.overall < 75;
  const isLmsGhost = student.lms.lastActiveDaysAgo > 10 || student.lms.assignmentCompletionRate < 60;

  // 1. Critical Multi-Pillar
  if (risks.overall === 'Critical' || (isLowAcademic && isLowAttendance && isLowPlacement)) {
    return COHORTS.CRITICAL_MULTI_PILLAR;
  }

  // 2. High Academic, but Placement Vulnerable
  if (isHighAcademic && isLowPlacement) {
    return COHORTS.PLACEMENT_VULNERABLE;
  }

  // 3. High Coding, but Slumping in Academics / Attendance
  if (isHighCoding && (isLowAttendance || isLowAcademic)) {
    return COHORTS.CODER_ACADEMIC_SLUMP;
  }

  // 4. Disengaged / LMS Ghost
  if (isLmsGhost || (isLowAttendance && student.feedback.stressLevel === 'High')) {
    return COHORTS.DISENGAGED_INACTIVE;
  }

  // 5. Champions
  if (metrics.compositeScore >= 85 && isHighAcademic && !isLowPlacement) {
    return COHORTS.CHAMPIONS;
  }

  // Default fallback based on composite score
  if (metrics.compositeScore < 65) {
    return COHORTS.DISENGAGED_INACTIVE;
  }
  return COHORTS.CHAMPIONS;
}

/**
 * Groups full list of students into cohort clusters with aggregate metrics
 */
export function segmentStudents(studentsWithMetrics) {
  const segments = {
    CHAMPIONS: [],
    PLACEMENT_VULNERABLE: [],
    CODER_ACADEMIC_SLUMP: [],
    DISENGAGED_INACTIVE: [],
    CRITICAL_MULTI_PILLAR: []
  };

  studentsWithMetrics.forEach(student => {
    const cohort = classifyStudentCohort(student, student.metrics);
    student.cohort = cohort;
    if (segments[cohort.id]) {
      segments[cohort.id].push(student);
    }
  });

  return segments;
}
