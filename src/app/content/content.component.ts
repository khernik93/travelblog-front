import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ContentActions from './content.actions';
import { TransferHttp } from '../shared/transfer-http/transfer-http';
import { AppState } from '../app.reducers';

const urls = {
  swiperPhotos: '/swiperphotos'
};

@Component({
  selector: 'content-component',
  styleUrls: [],
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private transferHttp: TransferHttp
  ) { }

  ngOnInit() {
    this.fetchSwiperPhotos();
  }

  private fetchSwiperPhotos() {
    this.transferHttp.get(urls.swiperPhotos)
    .subscribe(swiperPhotos => this.store.dispatch(new ContentActions.SetPhotos(swiperPhotos)));
  }

}
