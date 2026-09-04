import { TestBed } from '@angular/core/testing';

import { MarketDataService } from './market-data.service';

describe('MarketDataService', () => {
  let service: MarketDataService;

  beforeEach(() => {
    service = TestBed.inject(MarketDataService);
  });

  it('keeps the established stall application statuses in order', () => {
    expect(service.stallApplicationStatuses).toEqual([
      'Pending Payment',
      'For Payment Verification',
      'Payment Information Requested',
      'Payment Confirmed',
      'Additional Information Requested',
      'Reviewed',
      'For Interview',
      'For Final Review',
    ]);
  });

  it('routes payment statuses to Treasury and the rest to CEEMO', () => {
    expect(service.officeForStatus('Pending Payment')).toBe('Treasury');
    expect(service.officeForStatus('Payment Confirmed')).toBe('Treasury');
    expect(service.officeForStatus('For Interview')).toBe('CEEMO');
    expect(service.officeForStatus('For Final Review')).toBe('CEEMO');
  });

  it('places a status before, at, or after the current status', () => {
    // 'Additional Information Requested' is the current status of application 5.
    expect(service.stepPositionFor('Pending Payment', 'Additional Information Requested')).toBe(
      'passed',
    );
    expect(
      service.stepPositionFor('Additional Information Requested', 'Additional Information Requested'),
    ).toBe('current');
    expect(service.stepPositionFor('For Interview', 'Additional Information Requested')).toBe(
      'upcoming',
    );
  });

  it('tones a status by what it means rather than one colour per status', () => {
    expect(service.toneForStallStatus('Pending Payment')).toBe('action');
    expect(service.toneForStallStatus('Additional Information Requested')).toBe('action');
    expect(service.toneForStallStatus('For Interview')).toBe('progress');
    expect(service.toneForStallStatus('Payment Confirmed')).toBe('done');
  });

  it('allows an approved permit to request renewal', () => {
    const permit = service.getHawkerPermit('1');

    expect(permit?.approved).toBe(true);
    expect(service.canRequestRenewal(permit!)).toBe(true);
  });

  it('does not offer renewal for a permit that is not approved', () => {
    const permit = service.getHawkerPermit('3');

    expect(permit?.approved).toBe(false);
    expect(service.canRequestRenewal(permit!)).toBe(false);
  });

  it('records a renewal request on the permit', () => {
    service.requestRenewal('1');

    expect(service.getHawkerPermit('1')?.renewalRequested).toBe(true);
  });
});
