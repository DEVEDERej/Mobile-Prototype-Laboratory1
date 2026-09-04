import { Component, computed, inject, input } from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
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
import { MarketDataService } from '../../services/market-data.service';

/**
 * One hawker / ambulant permit in full: what the permit covers, today's
 * ambulant ticket, and the renewal action.
 *
 * Renewal stays available to an approved permit: the capstone fixed a defect
 * where an approved hawker could not renew, so this prototype must not show a
 * permit as un-renewable just because it is already approved.
 */
@Component({
  selector: 'app-hawker-permit-detail',
  templateUrl: './hawker-permit-detail.page.html',
  styleUrls: ['./hawker-permit-detail.page.scss'],
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
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
export class HawkerPermitDetailPage {
  private readonly market = inject(MarketDataService);

  /** Bound from the :id route parameter by withComponentInputBinding(). */
  readonly id = input.required<string>();

  readonly permit = computed(() => this.market.getHawkerPermit(this.id()));

  readonly stateLabel = computed(() => {
    const permit = this.permit();

    return permit ? this.market.permitStateLabel(permit) : '';
  });

  readonly stateTone = computed<StatusTone>(() => {
    const permit = this.permit();

    return permit ? this.market.toneForPermitState(permit) : 'idle';
  });

  readonly canRequestRenewal = computed(() => {
    const permit = this.permit();

    return permit ? this.market.canRequestRenewal(permit) : false;
  });

  requestRenewal(): void {
    this.market.requestRenewal(this.id());
  }
}
