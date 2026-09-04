import { Injectable, signal } from '@angular/core';

import { HawkerPermit } from '../models/hawker-permit.model';
import { StatusTone } from '../models/record-summary.model';
import {
  ResponsibleOffice,
  StallApplication,
  StallApplicationStatus,
  StatusPosition,
} from '../models/stall-application.model';

/**
 * Single source of prototype data and shared domain logic for both Laboratory
 * modules: Stall Application and Hawker / Ambulant Permit.
 *
 * The records below are sample data for this Ionic prototype only. The prototype
 * is not connected to the capstone's Laravel API or database, so no fee amount is
 * displayed anywhere: hawker daily rates live in the capstone's Settings and must
 * never be hardcoded or guessed here.
 */
@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  /**
   * Stall application statuses already established in the capstone, kept in their
   * established order. The detail page uses this list to show where an
   * application currently stands.
   */
  readonly stallApplicationStatuses: readonly StallApplicationStatus[] = [
    'Pending Payment',
    'For Payment Verification',
    'Payment Information Requested',
    'Payment Confirmed',
    'Additional Information Requested',
    'Reviewed',
    'For Interview',
    'For Final Review',
  ];

  private readonly stallApplicationsState = signal<StallApplication[]>([
    {
      id: '1',
      referenceNo: 'STA-2026-0118',
      applicantName: 'Marites Bautista',
      requestedStall: 'Stall No. 12',
      goodsToSell: 'Vegetables',
      status: 'Pending Payment',
      submittedOn: '2026-07-06',
      lastUpdatedOn: '2026-08-18',
    },
    {
      id: '2',
      referenceNo: 'STA-2026-0121',
      applicantName: 'Rogelio Santos',
      requestedStall: 'Stall No. 7',
      goodsToSell: 'Dried goods',
      status: 'For Payment Verification',
      submittedOn: '2026-07-09',
      lastUpdatedOn: '2026-08-21',
    },
    {
      id: '3',
      referenceNo: 'STA-2026-0126',
      applicantName: 'Divina Ramos',
      requestedStall: 'Stall No. 21',
      goodsToSell: 'Fresh fish',
      status: 'Payment Information Requested',
      submittedOn: '2026-07-14',
      lastUpdatedOn: '2026-08-24',
    },
    {
      id: '4',
      referenceNo: 'STA-2026-0130',
      applicantName: 'Nestor Villamor',
      requestedStall: 'Stall No. 4',
      goodsToSell: 'Rice and grains',
      status: 'Payment Confirmed',
      submittedOn: '2026-07-20',
      lastUpdatedOn: '2026-08-22',
    },
    {
      id: '5',
      referenceNo: 'STA-2026-0133',
      applicantName: 'Cristina Aquino',
      requestedStall: 'Stall No. 18',
      goodsToSell: 'Cooked food',
      status: 'Additional Information Requested',
      submittedOn: '2026-07-24',
      lastUpdatedOn: '2026-08-25',
    },
    {
      id: '6',
      referenceNo: 'STA-2026-0137',
      applicantName: 'Elmer Padilla',
      requestedStall: 'Stall No. 9',
      goodsToSell: 'Meat',
      status: 'Reviewed',
      submittedOn: '2026-07-28',
      lastUpdatedOn: '2026-08-19',
    },
    {
      id: '7',
      referenceNo: 'STA-2026-0140',
      applicantName: 'Josefina Cruz',
      requestedStall: 'Stall No. 15',
      goodsToSell: 'Fruits',
      status: 'For Interview',
      submittedOn: '2026-08-03',
      lastUpdatedOn: '2026-08-23',
    },
    {
      id: '8',
      referenceNo: 'STA-2026-0142',
      applicantName: 'Arnel Dizon',
      requestedStall: 'Stall No. 2',
      goodsToSell: 'Household items',
      status: 'For Final Review',
      submittedOn: '2026-08-05',
      lastUpdatedOn: '2026-08-25',
    },
  ]);

  private readonly hawkerPermitsState = signal<HawkerPermit[]>([
    {
      id: '1',
      permitNo: 'HAP-2026-0031',
      vendorName: 'Lorna Mendoza',
      goodsVended: 'Assorted vegetables',
      approved: true,
      validFrom: '2026-01-15',
      validUntil: '2026-12-31',
      dailyTicketIssuedToday: true,
      renewalRequested: false,
      lastUpdatedOn: '2026-08-26',
    },
    {
      id: '2',
      permitNo: 'HAP-2025-0034',
      vendorName: 'Benjie Ocampo',
      goodsVended: 'Kakanin',
      approved: true,
      validFrom: '2025-09-01',
      validUntil: '2026-08-31',
      dailyTicketIssuedToday: false,
      renewalRequested: false,
      lastUpdatedOn: '2026-08-24',
    },
    {
      id: '3',
      permitNo: 'HAP-2026-0037',
      vendorName: 'Marilou Fajardo',
      goodsVended: 'School supplies',
      approved: false,
      dailyTicketIssuedToday: false,
      renewalRequested: false,
      lastUpdatedOn: '2026-08-20',
    },
    {
      id: '4',
      permitNo: 'HAP-2026-0041',
      vendorName: 'Teodoro Salazar',
      goodsVended: 'Fruits in season',
      approved: true,
      validFrom: '2026-03-01',
      validUntil: '2027-02-28',
      dailyTicketIssuedToday: true,
      renewalRequested: false,
      lastUpdatedOn: '2026-08-26',
    },
  ]);

  /** Read-only views that the pages read from. */
  readonly stallApplications = this.stallApplicationsState.asReadonly();
  readonly hawkerPermits = this.hawkerPermitsState.asReadonly();

  getStallApplication(id: string): StallApplication | undefined {
    return this.stallApplicationsState().find((application) => application.id === id);
  }

  getHawkerPermit(id: string): HawkerPermit | undefined {
    return this.hawkerPermitsState().find((permit) => permit.id === id);
  }

  /**
   * Office that handles a status, following the capstone's established split:
   * Treasury covers the payment statuses, CEEMO covers documents, interview and
   * decision.
   */
  officeForStatus(status: StallApplicationStatus): ResponsibleOffice {
    const treasuryStatuses: StallApplicationStatus[] = [
      'Pending Payment',
      'For Payment Verification',
      'Payment Information Requested',
      'Payment Confirmed',
    ];

    return treasuryStatuses.includes(status) ? 'Treasury' : 'CEEMO';
  }

  /** What the responsible office is accountable for. */
  officeResponsibility(office: ResponsibleOffice): string {
    return office === 'Treasury'
      ? 'Fee and payment concerns'
      : 'Documents, interview and decision';
  }

  /**
   * Where a status sits in the established order relative to the application's
   * current status. The detail page draws its progress tracker from this, so
   * the tracker follows the capstone's status list instead of a percentage or
   * any invented notion of completion.
   */
  stepPositionFor(
    status: StallApplicationStatus,
    currentStatus: StallApplicationStatus,
  ): StatusPosition {
    const stepIndex = this.stallApplicationStatuses.indexOf(status);
    const currentIndex = this.stallApplicationStatuses.indexOf(currentStatus);

    if (stepIndex < currentIndex) {
      return 'passed';
    }

    return stepIndex === currentIndex ? 'current' : 'upcoming';
  }

  /**
   * Tone used so a status looks the same on every screen. Statuses are grouped
   * by what they mean rather than given one colour each: the three "Requested"
   * / "Pending" statuses need something from the applicant, the rest are being
   * worked on by an office, and a confirmed payment is settled.
   */
  toneForStallStatus(status: StallApplicationStatus): StatusTone {
    const awaitingApplicant: StallApplicationStatus[] = [
      'Pending Payment',
      'Payment Information Requested',
      'Additional Information Requested',
    ];

    if (awaitingApplicant.includes(status)) {
      return 'action';
    }

    return status === 'Payment Confirmed' ? 'done' : 'progress';
  }

  /**
   * Neutral label for a permit. The capstone establishes approval as part of the
   * permit lifecycle but does not establish an official permit status list, so
   * the prototype only reports whether the permit is approved.
   */
  permitStateLabel(permit: HawkerPermit): string {
    return permit.approved ? 'Approved' : 'Not yet approved';
  }

  toneForPermitState(permit: HawkerPermit): StatusTone {
    return permit.approved ? 'done' : 'idle';
  }

  /**
   * Renewal stays available to approved hawkers. The capstone previously had a
   * defect where an approved hawker could not renew, so the prototype must not
   * reintroduce that limitation.
   */
  canRequestRenewal(permit: HawkerPermit): boolean {
    return permit.approved && !permit.renewalRequested;
  }

  /**
   * Records a renewal request inside this prototype only. Nothing is sent to the
   * capstone backend.
   */
  requestRenewal(id: string): void {
    this.hawkerPermitsState.update((permits) =>
      permits.map((permit) =>
        permit.id === id ? { ...permit, renewalRequested: true } : permit,
      ),
    );
  }
}
