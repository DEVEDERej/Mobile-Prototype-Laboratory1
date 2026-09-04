import { Component, input } from '@angular/core';
import { IonBadge } from '@ionic/angular';

import { StatusTone } from '../../models/record-summary.model';

/**
 * Presents a status or state the same way everywhere in the app: in the Home
 * activity list, in both module lists and at the top of both detail pages.
 * Keeping it in one component means a stall application status and a hawker
 * permit state never drift apart visually.
 *
 * Both presentations are an ion-badge; the caller only changes its weight:
 *
 *   inline — plain coloured text, used inside a list row where the row
 *            already has a lot to say and a filled badge on every line would
 *            turn the list into badge soup.
 *   chip   — the same text on a soft tinted background, used once per detail
 *            page where the status is the headline of the screen.
 */
@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  imports: [IonBadge],
})
export class StatusChipComponent {
  /** Text shown in the chip, for example "For Interview". */
  readonly label = input.required<string>();

  /** Meaning of the status, decided in MarketDataService. */
  readonly tone = input<StatusTone>('idle');

  readonly variant = input<'inline' | 'chip'>('inline');
}
