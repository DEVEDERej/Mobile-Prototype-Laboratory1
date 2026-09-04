import { Component, input, output } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/angular';

import { DetailItem, StatusTone } from '../../models/record-summary.model';
import { DetailRowComponent } from '../detail-row/detail-row.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';

/**
 * Tappable summary row for one market record.
 *
 * A stall application and a hawker permit are different obligations, but on a
 * phone they are read the same way: reference number, whose record it is, what
 * state it is in, a couple of identifying fields, and a way into it. This
 * component owns that row so the two module lists and the Home activity list do
 * not repeat it three times.
 *
 * `compact` switches to the presentation Home needs. Home shows both modules in
 * one activity list, so the identifying fields would be meaningless side by side
 * there; the compact row leads with what changed instead. Same component, same
 * data, a layout that fits where it is used.
 *
 * It stays presentation-only: it never knows the routes. When the row is tapped
 * it raises `opened` and the page that used it decides where to navigate.
 */
@Component({
  selector: 'app-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonRow,
    DetailRowComponent,
    StatusChipComponent,
  ],
})
export class RecordCardComponent {
  readonly title = input.required<string>();
  readonly reference = input.required<string>();
  readonly statusLabel = input.required<string>();
  readonly statusTone = input<StatusTone>('idle');

  /** Module the record belongs to; only shown by the compact presentation. */
  readonly context = input<string>('');

  readonly details = input<DetailItem[]>([]);

  /** Activity presentation used on Home, where both modules share one list. */
  readonly compact = input<boolean>(false);

  /**
   * What kind of record this is, purely for presentation. An application is a
   * transaction moving through a workflow, so it renders as an `ion-item`
   * ledger row; a permit is a standing credential, so it renders as its own
   * `ion-card`. Neither module gains or loses any data because of this — it
   * only changes which Ionic component the row uses.
   */
  readonly kind = input<'application' | 'permit'>('application');

  /** Raised when the row is tapped so the parent page can open the record. */
  readonly opened = output<void>();
}
