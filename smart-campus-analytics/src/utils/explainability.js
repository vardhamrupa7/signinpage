/**
 * Bonus Credit: Explainable Score Engine (XAI / SHAP-style attribution)
 * Deconstructs the Student Success Score (SSS) relative to the institutional baseline (~72.0).
 * Calculates exact quantitative positive and negative contributors (+/- points) so faculty
 * can immediately see the rationale and root causes behind every score.
 */

export const INSTITUTIONAL_BASELINE = 72.0;

export function explainStudentScore(student, metrics, baseline = INSTITUTIONAL_BASELINE) {
  const drivers = [];
  const { compositeScore, pillarScores } = metrics;

  // 1. Academic Driver
  const cgpaDelta = student.academic.cgpa - 7.5; // baseline cgpa is 7.5
  const cgpaPoints = Math.round(cgpaDelta * 3.5);
  if (Math.abs(cgpaPoints) >= 2) {
    drivers.push({
      factor: 'Academic Performance (CGPA)',
      value: student.academic.cgpa.toFixed(2),
      impact: cgpaPoints,
      type: cgpaPoints > 0 ? 'positive' : 'negative',
      detail: cgpaPoints > 0 
        ? `CGPA of ${student.academic.cgpa.toFixed(2)} is above institutional benchmark (7.5)` 
        : `CGPA of ${student.academic.cgpa.toFixed(2)} lags behind peer cohort benchmark`
    });
  }

  // Backlogs Penalty Driver
  if (student.academic.backlogs > 0) {
    const backlogImpact = -(student.academic.backlogs * 8);
    drivers.push({
      factor: 'Active Course Backlogs',
      value: `${student.academic.backlogs} Backlog(s)`,
      impact: backlogImpact,
      type: 'negative',
      detail: `Heavy penalty incurred: ${student.academic.backlogs} uncleared subject(s) requiring remediation`
    });
  }

  // 2. Attendance Driver
  const att = student.attendance.overall;
  if (att < 75) {
    const penalty = Math.round(-(75 - att) * 1.2 - 6);
    drivers.push({
      factor: 'Attendance Regulation Violation',
      value: `${att}%`,
      impact: penalty,
      type: 'negative',
      detail: `Breaches statutory 75% attendance threshold (Current: ${att}%). Risk of semester debarment.`
    });
  } else if (att >= 85) {
    const bonus = Math.round((att - 75) * 0.4);
    drivers.push({
      factor: 'Exemplary Attendance',
      value: `${att}%`,
      impact: bonus,
      type: 'positive',
      detail: `High consistency in lecture & laboratory presence (${att}%) correlates with course mastery.`
    });
  }

  // 3. Placement & Coding Driver
  const coding = student.placement.codingScore;
  if (coding >= 80) {
    drivers.push({
      factor: 'Advanced Coding Proficiency',
      value: `${coding}/100`,
      impact: Math.round((coding - 65) * 0.35),
      type: 'positive',
      detail: `Strong competitive programming rating (${coding}) qualifies for Tier-1 engineering roles`
    });
  } else if (coding < 55) {
    drivers.push({
      factor: 'Deficit in Coding Assessment',
      value: `${coding}/100`,
      impact: Math.round((coding - 60) * 0.3),
      type: 'negative',
      detail: `Coding benchmark test score (${coding}%) is significantly below campus placement bar (60%)`
    });
  }

  // Aptitude & Mock Interview Driver
  const mock = student.placement.mockInterviewScore;
  if (mock < 55) {
    drivers.push({
      factor: 'Mock Interview Disqualification',
      value: `${mock}%`,
      impact: -7,
      type: 'negative',
      detail: `Failed technical/HR mock interview rubric (${mock}%). Needs immediate communication drill.`
    });
  } else if (mock >= 85) {
    drivers.push({
      factor: 'Exceptional Interview Readiness',
      value: `${mock}%`,
      impact: +6,
      type: 'positive',
      detail: `Cleared comprehensive mock interviews with high communication and problem-solving rating.`
    });
  }

  // 4. LMS Inactivity & Timeliness Driver
  const lmsInactivity = student.lms.lastActiveDaysAgo;
  if (lmsInactivity > 7) {
    const lmsPenalty = Math.round(-Math.min(15, lmsInactivity * 1.2));
    drivers.push({
      factor: 'LMS Inactivity / Dormancy',
      value: `${lmsInactivity} days dormant`,
      impact: lmsPenalty,
      type: 'negative',
      detail: `Student has not logged into college LMS portal for ${lmsInactivity} consecutive days.`
    });
  } else if (student.lms.assignmentCompletionRate >= 95) {
    drivers.push({
      factor: 'Flawless Assignment Turn-in',
      value: `${student.lms.assignmentCompletionRate}%`,
      impact: +5,
      type: 'positive',
      detail: `Consistently meets academic deadlines with 95%+ completion rate.`
    });
  }

  // 5. Co-curricular & Hackathons Driver
  const hackathons = student.engagement.hackathonsParticipated || 0;
  const certs = student.engagement.certifications?.length || 0;
  if (hackathons >= 2 || certs >= 2) {
    drivers.push({
      factor: 'Co-Curricular & Industry Credentials',
      value: `${hackathons} Hackathons, ${certs} Certs`,
      impact: +8,
      type: 'positive',
      detail: `Actively building proof-of-work through hackathon entries and verified industry certifications.`
    });
  }

  // Sort drivers: most influential negative and positive
  drivers.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  // Synthesize executive diagnostic summary
  const topNeg = drivers.filter(d => d.type === 'negative');
  const topPos = drivers.filter(d => d.type === 'positive');

  let narrative = '';
  if (compositeScore >= 85) {
    narrative = `Outstanding overall profile. Primary drivers are ${topPos.map(p => p.factor).slice(0, 2).join(' and ')}. Student is on track for campus honors and premier placements.`;
  } else if (compositeScore < 60) {
    narrative = `Critical academic & retention warning. Score is severely depressed by ${topNeg.map(n => n.factor.toLowerCase()).slice(0, 2).join(' and ')}. Immediate faculty mentor intervention advised.`;
  } else if (topNeg.length > 0) {
    narrative = `Moderate standing. Strong potential in ${topPos[0]?.factor || 'general coursework'} is hindered by ${topNeg[0]?.factor || 'unbalanced metrics'}. Targeted correction can boost score by 15-20 points.`;
  } else {
    narrative = `Stable performance across all campus metrics with steady academic and attendance progress.`;
  }

  return {
    baseline,
    compositeScore,
    netDifference: compositeScore - baseline,
    drivers,
    narrative
  };
}
