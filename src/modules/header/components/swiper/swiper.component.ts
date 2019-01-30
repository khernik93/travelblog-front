import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';
import Swiper from 'swiper';

import * as SwiperActions from './store/swiper.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectPhotos } from './store/swiper.selectors';
import { selectSelectedTab } from '../menu/store/menu.selectors';

const swiperSettings = {
  wrapper: '.swiper-container',
  options: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 300,
    preloadImages: true,
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
  private swiper: Swiper;
  private alive: boolean = true;

  constructor(
    private store: Store<HeaderState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.photos$ = this.store.select(selectPhotos);
  }

  ngOnInit() {
    this.getSwiperPhotos();
    this.setCurrentPhotosBasedOnSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getSwiperPhotos(): void {
    this.store.dispatch(new SwiperActions.GetPhotos());
  }

  private setCurrentPhotosBasedOnSelectedTab(): void {
    combineLatest(this.selectedTab$, this.photos$)
      .pipe(
        takeWhile(() => this.alive),
        filter(([selectedTab, photos]) => photos !== null)
      )
      .subscribe(([selectedTab, photos]) => {
        this.currentPhotos = photos[selectedTab];
        this.updateSwiper();
      });
  }

  /**
   * Initializes swiper for the first time if not yet done, or updates photos
   * on state change
   */
  private updateSwiper(): void {
    // Remove all slides to have a clean state
    if (this.swiper) {
      this.swiper.removeAllSlides();
    }
    this.changeDetectorRef.detectChanges();
    
    // And update slides again
    if (! this.swiper) {
      this.swiper = new Swiper(swiperSettings.wrapper, swiperSettings.options);
    } else {
      this.swiper.update();
    }
  }

}
