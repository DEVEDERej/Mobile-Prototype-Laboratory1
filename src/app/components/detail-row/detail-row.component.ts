import { Component, input } from '@angular/core';
import { IonItem, IonLabel, IonNote, IonText } from '@ionic/angular';

/**
 * One "label / value" line. Both detail pages and the record card are built from
 * these rows, so the label and value styling is written once instead of being
 * repeated for every field of an application or a permit.
 *
 * The caller picks the layout, because the same field reads differently in
 * different places:
 *
 *   inline  — label at the start, value at the end, used on the detail pages
 *             where the fields form a readable column of facts.
 *   stacked — label above its value, used inside a list row where two fields
 *             sit side by side and a full-width inline row would not fit.
 */
@Component({
  selector: 'app-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.scss'],
  imports: [IonItem, IonLabel, IonNote, IonText],
})
export class DetailRowComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly layout = input<'inline' | 'stacked'>('inline');
}
