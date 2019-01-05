import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AppState } from '../../app.reducers';

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

  photos: string[];

  private selectedTab$: Observable<number>;
  private tabs$: Observable<string[]>;
  private photos$: Observable<Map<string, string[]>>;
  private alive = true;
  private swiper: Swiper;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) { 
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
    this.tabs$ = this.store.select(state => state.header.tabs);
    this.photos$ = this.store.select(state => state.content.photos);
  }

  ngOnInit() {
    this.initializeSwiper();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private initializeSwiper() {
    combineLatest(this.selectedTab$, this.tabs$, this.photos$)
    .pipe(takeWhile(() => this.alive))
    .subscribe(([selectedTab, tabs, photos]) => {
      if (photos) {
        this.photos = photos[tabs[selectedTab]];
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
