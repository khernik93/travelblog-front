import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PreviousRouteService } from '../../shared/services/previousRoute.service';

@Component({
  selector: 'app',
  styleUrls: [],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private previousRouteService: PreviousRouteService
  ) { }

}
