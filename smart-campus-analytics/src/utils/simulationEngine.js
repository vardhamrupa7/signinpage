/**
 * Interactive What-If Scenario Simulation Engine
 * Allows faculty and administrators to model interventions:
 * "What if the student attends all remedial sessions (+12% attendance) and finishes 3 LMS assignments (+20%)?"
 * Computes real-time projected Student Success Score, risk mitigation, and cohort transition.
 */

import { calculateStudentMetrics } from './analyticsEngine';
import { classifyStudentCohort } from './segmentation';

export function simulateStudentScenario(originalStudent, scenarioParams) {
  // Deep clone student object
  const simulated = JSON.parse(JSON.stringify(originalStudent));

  // Apply scenario overrides
  if (scenarioParams.attendanceDelta !== undefined) {
    simulated.attendance.overall = Math.min(100, Math.max(0, simulated.attendance.overall + scenarioParams.attendanceDelta));
  }

  if (scenarioParams.lmsCompletionDelta !== undefined) {
    simulated.lms.assignmentCompletionRate = Math.min(100, Math.max(0, simulated.lms.assignmentCompletionRate + scenarioParams.lmsCompletionDelta));
    if (scenarioParams.lmsCompletionDelta > 0) {
      simulated.lms.lastActiveDaysAgo = 1; // student became active
    }
  }

  if (scenarioParams.backlogsOverride !== undefined) {
    simulated.academic.backlogs = Math.max(0, scenarioParams.backlogsOverride);
  }

  if (scenarioParams.codingDelta !== undefined) {
    simulated.placement.codingScore = Math.min(100, Math.max(0, simulated.placement.codingScore + scenarioParams.codingDelta));
  }

  if (scenarioParams.mockInterviewDelta !== undefined) {
    simulated.placement.mockInterviewScore = Math.min(100, Math.max(0, simulated.placement.mockInterviewScore + scenarioParams.mockInterviewDelta));
  }

  if (scenarioParams.cgpaDelta !== undefined) {
    simulated.academic.cgpa = Math.min(10.0, Math.max(0, simulated.academic.cgpa + scenarioParams.cgpaDelta));
  }

  // Recalculate metrics
  const newMetrics = calculateStudentMetrics(simulated);
  const originalMetrics = calculateStudentMetrics(originalStudent);
  const newCohort = classifyStudentCohort(simulated, newMetrics);
  const originalCohort = classifyStudentCohort(originalStudent, originalMetrics);

  const scoreDelta = newMetrics.compositeScore - originalMetrics.compositeScore;

  return {
    originalMetrics,
    newMetrics,
    scoreDelta,
    originalCohort,
    newCohort,
    simulatedStudent: simulated,
    riskMitigated: originalMetrics.risks.overall !== newMetrics.risks.overall,
    riskTransition: `${originalMetrics.risks.overall} ➔ ${newMetrics.risks.overall}`
  };
}
