import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AppState } from '../../app.reducers';
import { TransferHttp } from '../../shared/transfer-http/transfer-http';
import * as ContentActions from '../content.actions';

const urls = {
  swiperPhotos: '/swiperphotos'
};

const swiperSettings = {
  wrapper: '.swiper-container',
  options: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 500,
    pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
  }
};



@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent implements OnInit, OnDestroy {

  currentPhotos: string[];

  private selectedTab$: Observable<string>;
  private photos$: Observable<Map<string, string[]>>;
  private alive = true;
  private swiper: Swiper;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private transferHttp: TransferHttp
  ) { 
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
    this.photos$ = this.store.select(state => state.content.photos);
  }

  ngOnInit() {
    this.getSwiperPhotos();
    this.watchForSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getSwiperPhotos() {
    this.transferHttp.get(urls.swiperPhotos)
    .subscribe(swiperPhotos => this.store.dispatch(new ContentActions.SetPhotos(swiperPhotos)));
  }

  private watchForSelectedTab() {
    combineLatest(this.selectedTab$, this.photos$)
    .pipe(takeWhile(() => this.alive))
    .subscribe(([selectedTab, photos]) => {
      if (photos) {
        this.currentPhotos = photos[selectedTab];
        this.updateSwiper();
      }
    });
  }

  /**
   * Initializes swiper for the first time if not yet done, or updates photos
   * on state change (@see initializeSwiper())
   */
  private updateSwiper() {
    if (this.swiper) {
      this.swiper.removeAllSlides();
    }
    this.changeDetectorRef.detectChanges();
    
    if (! this.swiper) {
      this.swiper = new Swiper(swiperSettings.wrapper, swiperSettings.options);
    } else {
      this.swiper.update();
    }
  }

}
