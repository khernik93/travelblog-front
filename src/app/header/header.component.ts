import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TransferHttp } from '../shared/transfer-http/transfer-http';
import { AppState } from '../app.reducers';
import * as HeaderActions from './header.actions';

const urls = {
  countries: '/countries'
};

@Component({
  selector: 'header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private transferHttp: TransferHttp
  ) { }

  ngOnInit() {
    this.fetchTabs();
  }

  private fetchTabs() {
    this.transferHttp.get(urls.countries)
    .subscribe(countries => this.store.dispatch(new HeaderActions.SetTabs(countries)));
  }

}
