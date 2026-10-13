/**
 * Smart Campus Analytics Engine
 * Algorithmic formulation for Student Success Score (SSS), Multi-Factor Risk Assessment,
 * and early warning heuristics aligned with Higher Education / Accreditation (NAAC/ABET/AICTE) standards.
 */

export const SCORING_WEIGHTS = {
  academic: 0.25,      // 25% - CGPA, Internal Marks, Backlog Penalties
  attendance: 0.20,    // 20% - Overall %, Theory vs Lab, 75% Statutory Compliance
  placement: 0.20,     // 20% - Coding, Aptitude, Mock Interviews, Resume
  lms: 0.15,           // 15% - Logins, Submission Rate, Timeliness, Activity Recency
  skills: 0.10,        // 10% - Technical & Soft Skill Assessments
  engagement: 0.05,    // 5%  - Clubs, Events, Hackathons, Certifications
  feedback: 0.05       // 5%  - Satisfaction, Well-being, Faculty Sentiment
};

/**
 * Calculates normalized pillar scores (0 - 100) and composite Student Success Score
 */
export function calculateStudentMetrics(student, customWeights = SCORING_WEIGHTS) {
  // 1. Academic Pillar (0 - 100)
  // Base from CGPA (out of 10) -> CGPA * 10
  const cgpaScore = Math.min(100, Math.max(0, (student.academic.cgpa / 10) * 100));
  const internalScore = student.academic.internalMarksAvg;
  // Penalty for backlogs: 8 points deduction per active backlog
  const backlogPenalty = student.academic.backlogs * 8;
  const academicScore = Math.max(0, Math.min(100, (cgpaScore * 0.65 + internalScore * 0.35) - backlogPenalty));

  // 2. Attendance Pillar (0 - 100)
  const overallAtt = student.attendance.overall;
  // AICTE statutory penalty: Below 75% gets an additional risk penalty
  let attScore = overallAtt;
  if (overallAtt < 75) {
    attScore = Math.max(0, overallAtt - (75 - overallAtt) * 0.8);
  }
  const attendanceScore = Math.max(0, Math.min(100, attScore));

  // 3. Placement Pillar (0 - 100)
  const aptitude = student.placement.aptitudeScore;
  const coding = student.placement.codingScore;
  const mock = student.placement.mockInterviewScore;
  const resume = student.placement.resumeScore || 70;
  const placementScore = Math.max(0, Math.min(100, aptitude * 0.30 + coding * 0.40 + mock * 0.20 + resume * 0.10));

  // 4. LMS Pillar (0 - 100)
  const completion = student.lms.assignmentCompletionRate;
  const loginNorm = Math.min(100, (student.lms.loginFrequencyPerWeek / 7) * 100);
  const recencyPenalty = student.lms.lastActiveDaysAgo > 10 ? Math.min(30, (student.lms.lastActiveDaysAgo - 10) * 3) : 0;
  const lmsScore = Math.max(0, Math.min(100, (completion * 0.65 + loginNorm * 0.35) - recencyPenalty));

  // 5. Skills Pillar (0 - 100)
  const techAvg = (
    student.skills.technical.dsa +
    student.skills.technical.webCloud +
    student.skills.technical.dbSystem +
    student.skills.technical.problemSolving
  ) / 4;
  const softAvg = (
    student.skills.soft.communication +
    student.skills.soft.teamwork +
    student.skills.soft.criticalThinking +
    student.skills.soft.leadership
  ) / 4;
  const skillsScore = Math.max(0, Math.min(100, techAvg * 0.60 + softAvg * 0.40));

  // 6. Engagement Pillar (0 - 100)
  const eventPoints = Math.min(40, (student.engagement.campusEventsAttended || 0) * 10);
  const clubPoints = Math.min(25, (student.engagement.technicalClubs?.length || 0) * 12.5);
  const hackathonPoints = Math.min(25, (student.engagement.hackathonsParticipated || 0) * 12.5 + (student.engagement.hackathonWins || 0) * 10);
  const certPoints = Math.min(10, (student.engagement.certifications?.length || 0) * 5);
  const engagementScore = Math.min(100, eventPoints + clubPoints + hackathonPoints + certPoints);

  // 7. Feedback & Sentiment Pillar (0 - 100)
  const satisfactionNorm = (student.feedback.studentSatisfaction / 5) * 100;
  const stressAdjustment = student.feedback.stressLevel === 'High' ? -15 : student.feedback.stressLevel === 'Moderate' ? 0 : 10;
  const feedbackScore = Math.max(0, Math.min(100, satisfactionNorm + stressAdjustment));

  // Composite Student Success Score (SSS)
  const compositeScore = Math.round(
    academicScore * customWeights.academic +
    attendanceScore * customWeights.attendance +
    placementScore * customWeights.placement +
    lmsScore * customWeights.lms +
    skillsScore * customWeights.skills +
    engagementScore * customWeights.engagement +
    feedbackScore * customWeights.feedback
  );

  // Pillar Scores Breakdown
  const pillarScores = {
    academic: Math.round(academicScore),
    attendance: Math.round(attendanceScore),
    placement: Math.round(placementScore),
    lms: Math.round(lmsScore),
    skills: Math.round(skillsScore),
    engagement: Math.round(engagementScore),
    feedback: Math.round(feedbackScore)
  };

  // Risk Flagging Heuristics
  // 1. Academic Risk
  let academicRisk = 'Low';
  let academicReasons = [];
  if (student.academic.backlogs > 0 || student.academic.cgpa < 6.0) {
    academicRisk = 'High';
    if (student.academic.backlogs > 0) academicReasons.push(`${student.academic.backlogs} active backlogs`);
    if (student.academic.cgpa < 6.0) academicReasons.push(`CGPA is ${student.academic.cgpa.toFixed(2)} (< 6.0 cutoff)`);
  } else if (student.academic.cgpa < 7.0 || student.academic.internalMarksAvg < 65) {
    academicRisk = 'Medium';
    academicReasons.push('Borderline CGPA or low internal assessment marks');
  }

  // 2. Attendance / Dropout Risk
  let attendanceRisk = 'Low';
  let attendanceReasons = [];
  if (student.attendance.overall < 75) {
    attendanceRisk = 'High';
    attendanceReasons.push(`Attendance ${student.attendance.overall}% is below statutory 75% cutoff`);
  } else if (student.attendance.overall < 80 || student.attendance.consecutiveAbsences >= 3) {
    attendanceRisk = 'Medium';
    attendanceReasons.push(`Attendance ${student.attendance.overall}% approaching warning threshold`);
  }

  // 3. Placement Risk
  let placementRisk = 'Low';
  let placementReasons = [];
  if (student.placement.codingScore < 55 || student.placement.aptitudeScore < 55 || student.placement.mockInterviewScore < 50) {
    placementRisk = 'High';
    if (student.placement.codingScore < 55) placementReasons.push(`Coding proficiency (${student.placement.codingScore}%) below benchmark`);
    if (student.placement.aptitudeScore < 55) placementReasons.push(`Aptitude percentile (${student.placement.aptitudeScore}%) below eligibility`);
    if (student.placement.mockInterviewScore < 50) placementReasons.push(`Failed mock interview assessment (${student.placement.mockInterviewScore}%)`);
  } else if (student.placement.codingScore < 68 || student.placement.aptitudeScore < 65) {
    placementRisk = 'Medium';
    placementReasons.push('Placement readiness requires skill refinement');
  }

  // 4. Overall Classification
  let overallRisk = 'On Track';
  let riskColor = 'emerald';
  let riskBadge = 'Good Standing';

  const highRiskCount = [academicRisk, attendanceRisk, placementRisk].filter(r => r === 'High').length;
  const medRiskCount = [academicRisk, attendanceRisk, placementRisk].filter(r => r === 'Medium').length;

  if (compositeScore < 60 || highRiskCount >= 2 || (academicRisk === 'High' && attendanceRisk === 'High')) {
    overallRisk = 'Critical';
    riskColor = 'rose';
    riskBadge = 'Critical Intervention';
  } else if (compositeScore < 72 || highRiskCount === 1 || medRiskCount >= 2) {
    overallRisk = 'Warning';
    riskColor = 'amber';
    riskBadge = 'Early Warning';
  } else if (compositeScore >= 88) {
    overallRisk = 'Exemplary';
    riskColor = 'purple';
    riskBadge = 'Campus Champion';
  } else {
    overallRisk = 'On Track';
    riskColor = 'emerald';
    riskBadge = 'On Track';
  }

  return {
    compositeScore,
    pillarScores,
    risks: {
      academic: academicRisk,
      academicReasons,
      attendance: attendanceRisk,
      attendanceReasons,
      placement: placementRisk,
      placementReasons,
      overall: overallRisk,
      riskBadge,
      riskColor
    }
  };
}
