import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { RecordCardComponent } from '../../components/record-card/record-card.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { RecordSummary } from '../../models/record-summary.model';
import { MarketDataService } from '../../services/market-data.service';

/**
 * Entry point of the prototype: what the two services are, how many records
 * each one holds, and what changed most recently across both of them.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonList,
    IonRow,
    IonTitle,
    IonToolbar,
    RouterLink,
    RecordCardComponent,
    SectionHeadingComponent,
  ],
})
export class HomePage {
  private readonly market = inject(MarketDataService);
  private readonly router = inject(Router);

  readonly applicationCount = computed(() => this.market.stallApplications().length);
  readonly permitCount = computed(() => this.market.hawkerPermits().length);

  /**
   * Applications whose status is literally a request for information from the
   * applicant. Both of these statuses are established in the capstone.
   */
  readonly awaitingInformationCount = computed(
    () =>
      this.market
        .stallApplications()
        .filter(
          (application) =>
            application.status === 'Payment Information Requested' ||
            application.status === 'Additional Information Requested',
        ).length,
  );

  readonly approvedPermitCount = computed(
    () => this.market.hawkerPermits().filter((permit) => permit.approved).length,
  );

  /**
   * Newest updates from both modules in one list. Because both record types are
   * mapped to the same summary shape, the reusable record card can render them
   * side by side in its compact activity presentation.
   */
  readonly recentRecords = computed<RecordSummary[]>(() => {
    const applications = this.market.stallApplications().map((application) => ({
      updatedOn: application.lastUpdatedOn,
      summary: {
        id: `stall-${application.id}`,
        title: application.applicantName,
        reference: application.referenceNo,
        context: 'Stall application',
        statusLabel: application.status,
        statusTone: this.market.toneForStallStatus(application.status),
        details: [{ label: 'Updated', value: application.lastUpdatedOn }],
        link: ['/stall-applications', application.id],
      } as RecordSummary,
    }));

    const permits = this.market.hawkerPermits().map((permit) => ({
      updatedOn: permit.lastUpdatedOn,
      summary: {
        id: `hawker-${permit.id}`,
        title: permit.vendorName,
        reference: permit.permitNo,
        context: 'Ambulant permit',
        statusLabel: this.market.permitStateLabel(permit),
        statusTone: this.market.toneForPermitState(permit),
        details: [{ label: 'Updated', value: permit.lastUpdatedOn }],
        link: ['/hawker-permits', permit.id],
      } as RecordSummary,
    }));

    return [...applications, ...permits]
      .sort((first, second) => second.updatedOn.localeCompare(first.updatedOn))
      .slice(0, 5)
      .map((entry) => entry.summary);
  });

  openRecord(record: RecordSummary): void {
    this.router.navigate(record.link);
  }
}
