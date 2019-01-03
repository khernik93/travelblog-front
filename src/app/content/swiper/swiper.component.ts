import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AppState } from '../../app.reducers';

const swiperSettings = {
  wrapper: '.hero-slider',
  options: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
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
  styleUrls: [],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent implements OnInit, AfterViewInit, OnDestroy {

  photos: string[];

  private selectedTab$: Observable<number>;
  private tabs$: Observable<string[]>;
  private photos$: Observable<Map<string, string[]>>;
  private alive = true;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
    this.initializeSwiping();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private initialize() {
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
    this.tabs$ = this.store.select(state => state.header.tabs);
    this.photos$ = this.store.select(state => state.content.photos);

    combineLatest(this.selectedTab$, this.tabs$, this.photos$)
    .pipe(takeWhile(() => this.alive))
    .subscribe(([selectedTab, tabs, photos]) => {
      if (photos) {
        this.photos = photos[tabs[selectedTab]] || null;
      }
    });
  }

  private initializeSwiping() {
    new Swiper(swiperSettings.wrapper, swiperSettings.options);
  }

}
