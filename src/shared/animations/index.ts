import {
  animate,
  style,
  transition,
  trigger,
  keyframes,
  animation
} from '@angular/animations';

const ANIMATION_TIME = '.3s';

export const FadeToggleAnimation =
  trigger('fadeToggle', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(ANIMATION_TIME)
    ]),

    transition(':leave', [
      animate(ANIMATION_TIME, style({ opacity: 0 }))
    ])
  ]);
