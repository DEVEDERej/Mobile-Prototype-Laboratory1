import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { RecordCardComponent } from '../../components/record-card/record-card.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { RecordSummary } from '../../models/record-summary.model';
import { MarketDataService } from '../../services/market-data.service';

/** Segment filter values: the two offices established for this module. */
type OfficeFilter = 'all' | 'Treasury' | 'CEEMO';

/**
 * Stall Application module list. Applications can be searched by applicant or
 * reference number and filtered by the office currently handling them, which
 * follows the capstone's Treasury / CEEMO responsibility split.
 */
@Component({
  selector: 'app-stall-applications',
  templateUrl: './stall-applications.page.html',
  styleUrls: ['./stall-applications.page.scss'],
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
    FormsModule,
    EmptyStateComponent,
    RecordCardComponent,
    SectionHeadingComponent,
  ],
})
export class StallApplicationsPage {
  private readonly market = inject(MarketDataService);
  private readonly router = inject(Router);

  /** What the user typed in the searchbar. */
  readonly searchTerm = signal('');

  /** Which office the list is currently filtered to. */
  readonly officeFilter = signal<OfficeFilter>('all');

  readonly totalCount = computed(() => this.market.stallApplications().length);

  /** Applications left after the search text and the office filter are applied. */
  readonly filteredApplications = computed<RecordSummary[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const office = this.officeFilter();

    return this.market
      .stallApplications()
      .filter((application) => {
        const matchesOffice =
          office === 'all' || this.market.officeForStatus(application.status) === office;

        const matchesTerm =
          term === '' ||
          application.applicantName.toLowerCase().includes(term) ||
          application.referenceNo.toLowerCase().includes(term);

        return matchesOffice && matchesTerm;
      })
      .map((application) => ({
        id: application.id,
        title: application.applicantName,
        reference: application.referenceNo,
        statusLabel: application.status,
        statusTone: this.market.toneForStallStatus(application.status),
        details: [
          { label: 'Requested stall', value: application.requestedStall },
          { label: 'Goods to sell', value: application.goodsToSell },
        ],
        link: ['/stall-applications', application.id],
      }));
  });

  readonly hasActiveFilter = computed(
    () => this.searchTerm().trim() !== '' || this.officeFilter() !== 'all',
  );

  onOfficeFilterChange(value: string | number | undefined): void {
    this.officeFilter.set((value ?? 'all') as OfficeFilter);
  }

  openApplication(record: RecordSummary): void {
    this.router.navigate(record.link);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.officeFilter.set('all');
  }
}
