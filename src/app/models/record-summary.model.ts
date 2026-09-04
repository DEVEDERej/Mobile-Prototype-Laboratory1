/**
 * How much colour a status is allowed to spend, expressed as meaning rather
 * than as a colour name. Both modules map their own states onto these four
 * tones so the app never grows one accent colour per status.
 *
 *  action   — the applicant or vendor has something to do
 *  progress — an office is working on it
 *  done     — that step is settled
 *  idle     — nothing to report on this record yet
 */
export type StatusTone = 'action' | 'progress' | 'done' | 'idle';

/** A single label/value line shown by the reusable detail-row component. */
export interface DetailItem {
  label: string;
  value: string;
}

/**
 * Presentation shape shared by stall applications and hawker permits so both
 * modules can be rendered by the same reusable record card.
 */
export interface RecordSummary {
  id: string;
  title: string;
  reference: string;
  /**
   * Which module the record belongs to. Only the Home activity list needs it,
   * because that is the one place where both modules appear in one list.
   */
  context?: string;
  statusLabel: string;
  statusTone: StatusTone;
  details: DetailItem[];
  /** Route the owning page navigates to when the record is opened. */
  link: string[];
}
