import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HawkerPermitDetailPage } from './hawker-permit-detail.page';

describe('HawkerPermitDetailPage', () => {
  let fixture: ComponentFixture<HawkerPermitDetailPage>;

  const text = () => fixture.nativeElement.textContent as string;

  const renderPermit = (id: string) => {
    fixture = TestBed.createComponent(HawkerPermitDetailPage);
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HawkerPermitDetailPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('offers renewal for an approved permit', () => {
    renderPermit('1');

    expect(fixture.componentInstance.canRequestRenewal()).toBe(true);
    expect(text()).toContain('Request renewal');
  });

  it('records the renewal request when the button handler runs', () => {
    renderPermit('1');

    fixture.componentInstance.requestRenewal();
    fixture.detectChanges();

    expect(fixture.componentInstance.canRequestRenewal()).toBe(false);
    expect(text()).toContain('Renewal request recorded');
  });

  it('does not offer renewal before the permit is approved', () => {
    renderPermit('3');

    expect(text()).toContain('Renewal becomes available once the permit is approved.');
    expect(text()).not.toContain('Daily ambulant ticket');
  });

  it('shows the daily ambulant ticket state for an approved permit', () => {
    renderPermit('2');

    expect(text()).toContain('Daily ambulant ticket');
    expect(text()).toContain('Not yet issued today');
  });

  it('shows the empty state for an unknown permit', () => {
    renderPermit('999');

    expect(fixture.nativeElement.querySelector('app-empty-state')).toBeTruthy();
  });
});
