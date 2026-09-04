/**
 * Hawker / Ambulant Permit module — Cabanatuan City Public Market Management System.
 *
 * A hawker permit is a separate operational obligation from a stall. The
 * capstone establishes registration/permit processing, approval, renewal and
 * daily ticketing for hawkers, but this prototype deliberately does not define
 * an official permit status taxonomy or any fee amount, because those are not
 * established for reuse here (rates live in the capstone's Settings).
 */
export interface HawkerPermit {
  id: string;
  permitNo: string;
  vendorName: string;
  goodsVended: string;
  /** Approval is an established step of the permit lifecycle. */
  approved: boolean;
  /** Validity dates are only present once a permit has been approved. */
  validFrom?: string;
  validUntil?: string;
  /**
   * Daily ambulant ticket for today. Hawker tickets are tracked separately from
   * stall tickets in the capstone (tickets carry a source_type).
   */
  dailyTicketIssuedToday: boolean;
  /** Set locally when a renewal is requested from this prototype. */
  renewalRequested: boolean;
  lastUpdatedOn: string;
}
