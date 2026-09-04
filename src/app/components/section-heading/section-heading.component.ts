import { Component, input } from '@angular/core';
import { IonLabel, IonListHeader } from '@ionic/angular';

/**
 * The small heading that opens a group of information, with an optional line of
 * supporting text under it.
 *
 * Every screen groups its content, so without this component each page would
 * write and re-style its own heading. Keeping it here means the heading size,
 * weight, letter spacing and the gap to the group below are decided once.
 */
@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss'],
  imports: [IonLabel, IonListHeader],
})
export class SectionHeadingComponent {
  readonly heading = input.required<string>();

  /** Optional supporting line, for example a result count. */
  readonly note = input<string>('');
}
