import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StallApplicationsPage } from './stall-applications.page';

describe('StallApplicationsPage', () => {
  let component: StallApplicationsPage;
  let fixture: ComponentFixture<StallApplicationsPage>;

  const renderedCards = () => fixture.nativeElement.querySelectorAll('app-record-card');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StallApplicationsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StallApplicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders one card per application with @for', () => {
    expect(renderedCards().length).toBe(component.totalCount());
  });

  it('filters the list by the office handling the application', () => {
    component.onOfficeFilterChange('CEEMO');
    fixture.detectChanges();

    expect(component.filteredApplications().length).toBeLessThan(component.totalCount());
    expect(renderedCards().length).toBe(component.filteredApplications().length);
  });

  it('filters the list by applicant name', () => {
    component.searchTerm.set('josefina');
    fixture.detectChanges();

    expect(component.filteredApplications().length).toBe(1);
    expect(component.filteredApplications()[0].title).toBe('Josefina Cruz');
  });

  it('shows the empty state when nothing matches the search', () => {
    component.searchTerm.set('no-such-applicant');
    fixture.detectChanges();

    expect(renderedCards().length).toBe(0);
    expect(fixture.nativeElement.querySelector('app-empty-state')).toBeTruthy();
  });

  it('restores the full list when the filters are cleared', () => {
    component.searchTerm.set('no-such-applicant');
    component.onOfficeFilterChange('Treasury');
    fixture.detectChanges();

    component.clearFilters();
    fixture.detectChanges();

    expect(renderedCards().length).toBe(component.totalCount());
  });
});
