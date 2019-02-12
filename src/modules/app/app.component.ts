import { Component } from '@angular/core';
import { PreviousRouteService } from '../../shared/services/previousRoute.service';

@Component({
  selector: 'app',
  styleUrls: [],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private previousRouteService: PreviousRouteService
  ) { }

}
