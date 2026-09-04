import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('names both modules with their record counts', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Stall Application');
    expect(text).toContain('Hawker / Ambulant Permit');
    expect(text).toContain(`${component.applicationCount()} applications on record`);
    expect(text).toContain(`${component.permitCount()} permits on record`);
  });

  it('links each module card to its own route', () => {
    const router = TestBed.inject(Router);

    const targets = fixture.debugElement
      .queryAll(By.directive(RouterLink))
      .map((element) => element.injector.get(RouterLink).urlTree)
      .map((urlTree) => (urlTree ? router.serializeUrl(urlTree) : null));

    expect(targets).toEqual(['/stall-applications', '/hawker-permits']);
  });

  it('shows recent updates from both modules through the reusable card', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-record-card');

    expect(cards.length).toBe(component.recentRecords().length);
    expect(component.recentRecords().length).toBeGreaterThan(0);
  });
});
