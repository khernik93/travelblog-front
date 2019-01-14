import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';
import Swiper from 'swiper';

import { AppState } from '../../../app/app.reducers';
import * as SwiperActions from './swiper.actions';
import { SwiperService } from './swiper.service';

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
  private swiper: Swiper;
  private alive: boolean = true;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private swiperService: SwiperService
  ) {
    this.selectedTab$ = this.store.select(state => state.menu.selectedTab);
    this.photos$ = this.store.select(state => state.swiper.photos);
  }

  ngOnInit() {
    this.getSwiperPhotos();
    this.setCurrentPhotosBasedOnSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getSwiperPhotos(): void {
    this.swiperService.getPhotos()
      .subscribe((photos: Map<string, string[]>) => this.store.dispatch(new SwiperActions.SetPhotos(photos)));
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
