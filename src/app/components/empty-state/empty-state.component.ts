import { Component, input } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular';

/**
 * Shown wherever a list has nothing to display: no permits recorded, no stall
 * application matching the current search or filter, or a record that could not
 * be found. Without it each page would write its own "nothing here" markup.
 */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  imports: [IonCard, IonCardContent],
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input<string>('');
}
