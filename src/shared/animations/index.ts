import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

/**
* Fade in element on void => ", and fade out on * => void
*
* @type {AnimationTriggerMetadata}
*/
export const fadeToggle =
  trigger('fadeToggle', [

      transition(':enter', [
          style({ opacity: 0 }),
          animate('.3s')
      ]),

      transition(':leave', [
          animate('.3s', style({ opacity: 0 }))
      ])

  ]);
