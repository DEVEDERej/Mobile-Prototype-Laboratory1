/**
 * Stall Application module — Cabanatuan City Public Market Management System.
 *
 * The status list below is the set of application statuses already established
 * in the capstone. It is reproduced here in the same order; no status is
 * renamed, merged, or added.
 */
export type StallApplicationStatus =
  | 'Pending Payment'
  | 'For Payment Verification'
  | 'Payment Information Requested'
  | 'Payment Confirmed'
  | 'Additional Information Requested'
  | 'Reviewed'
  | 'For Interview'
  | 'For Final Review';

/**
 * Office responsible for a status, following the capstone's established split:
 * Treasury handles fee/payment concerns, CEEMO handles documents, interview
 * and decision.
 */
export type ResponsibleOffice = 'Treasury' | 'CEEMO';

/**
 * Where a status sits relative to the application's current status.
 *
 * This is a position in the established order, not a new business status. An
 * application is never "completed": `passed` only means the status comes before
 * the current one in the list the capstone already defines.
 */
export type StatusPosition = 'passed' | 'current' | 'upcoming';

export interface StallApplication {
  id: string;
  referenceNo: string;
  applicantName: string;
  requestedStall: string;
  goodsToSell: string;
  status: StallApplicationStatus;
  submittedOn: string;
  lastUpdatedOn: string;
}
