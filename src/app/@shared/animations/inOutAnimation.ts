import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const inOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [
    animate(
      '.6s ease-out',
      keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
    ),
  ]),
  transition(':leave', [
    animate(
      '.6s ease-in-out',
      keyframes([
        style({ opacity: 1 }),
        style({ opacity: 0 })
      ])
    ),
  ]),
]);
