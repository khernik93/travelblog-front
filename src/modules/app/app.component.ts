/* istanbul ignore file */
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PreviousRouteService } from '../../shared/services/previousRoute.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app',
  styleUrls: [],
  template: `
    <router-outlet></router-outlet>
    <notification-container></notification-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private previousRouteService: PreviousRouteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onRedirectScrollToTop();
  }

  private onRedirectScrollToTop() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }

}
