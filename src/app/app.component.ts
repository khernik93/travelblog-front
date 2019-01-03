import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-app',
  styleUrls: ['./../styles.scss', './app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

}
