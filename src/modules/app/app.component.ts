import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PreviousRouteService } from '../../shared/services/previousRoute.service';

@Component({
  selector: 'app',
  styleUrls: [],
  template: `
    <router-outlet></router-outlet>
    <notification-container></notification-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private previousRouteService: PreviousRouteService
  ) { }

}
