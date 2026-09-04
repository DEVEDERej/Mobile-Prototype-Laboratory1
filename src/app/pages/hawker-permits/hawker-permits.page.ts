import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { RecordCardComponent } from '../../components/record-card/record-card.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { RecordSummary } from '../../models/record-summary.model';
import { MarketDataService } from '../../services/market-data.service';

/**
 * Hawker / Ambulant Permit module list. A hawker permit is a separate
 * obligation from a stall, so it has its own list rather than being merged with
 * stall applications.
 */
@Component({
  selector: 'app-hawker-permits',
  templateUrl: './hawker-permits.page.html',
  styleUrls: ['./hawker-permits.page.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    EmptyStateComponent,
    RecordCardComponent,
    SectionHeadingComponent,
  ],
})
export class HawkerPermitsPage {
  private readonly market = inject(MarketDataService);
  private readonly router = inject(Router);

  readonly approvedCount = computed(
    () => this.market.hawkerPermits().filter((permit) => permit.approved).length,
  );

  /** Permits mapped into the shape the reusable record card expects. */
  readonly permits = computed<RecordSummary[]>(() =>
    this.market.hawkerPermits().map((permit) => ({
      id: permit.id,
      title: permit.vendorName,
      reference: permit.permitNo,
      statusLabel: this.market.permitStateLabel(permit),
      statusTone: this.market.toneForPermitState(permit),
      details: [
        { label: 'Goods vended', value: permit.goodsVended },
        { label: 'Valid until', value: permit.validUntil ?? 'Not set' },
      ],
      link: ['/hawker-permits', permit.id],
    })),
  );

  openPermit(record: RecordSummary): void {
    this.router.navigate(record.link);
  }
}
