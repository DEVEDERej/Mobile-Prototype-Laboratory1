import { Component, computed, inject, input } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { DetailRowComponent } from '../../components/detail-row/detail-row.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { StatusChipComponent } from '../../components/status-chip/status-chip.component';
import { StatusTone } from '../../models/record-summary.model';
import {
  ResponsibleOffice,
  StallApplicationStatus,
  StatusPosition,
} from '../../models/stall-application.model';
import { MarketDataService } from '../../services/market-data.service';

/**
 * One stall application in full: its fields, the office currently accountable
 * for it, and the established status list drawn as a progress tracker with the
 * current status marked.
 */
@Component({
  selector: 'app-stall-application-detail',
  templateUrl: './stall-application-detail.page.html',
  styleUrls: ['./stall-application-detail.page.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
    DetailRowComponent,
    EmptyStateComponent,
    SectionHeadingComponent,
    StatusChipComponent,
  ],
})
export class StallApplicationDetailPage {
  private readonly market = inject(MarketDataService);

  /** Bound from the :id route parameter by withComponentInputBinding(). */
  readonly id = input.required<string>();

  readonly application = computed(() => this.market.getStallApplication(this.id()));

  /** Established status list, rendered in order by the progress tracker. */
  readonly statuses = this.market.stallApplicationStatuses;

  readonly office = computed(() => {
    const application = this.application();

    return application ? this.market.officeForStatus(application.status) : undefined;
  });

  readonly officeResponsibility = computed(() => {
    const office = this.office();

    return office ? this.market.officeResponsibility(office) : '';
  });

  statusTone(status: StallApplicationStatus): StatusTone {
    return this.market.toneForStallStatus(status);
  }

  officeForStatus(status: StallApplicationStatus): ResponsibleOffice {
    return this.market.officeForStatus(status);
  }

  /**
   * Where a status sits relative to this application's current status. The
   * tracker binds it to a data attribute, and the stylesheet turns the three
   * possible positions into the three visual states of a step.
   */
  stepPosition(status: StallApplicationStatus): StatusPosition {
    const application = this.application();

    return application
      ? this.market.stepPositionFor(status, application.status)
      : 'upcoming';
  }
}
