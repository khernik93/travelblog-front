import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swiper from 'swiper';
import isEqual from 'lodash-es/isEqual';

import { GetPhotos } from './store/swiper.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectPhotos } from './store/swiper.selectors';
import { selectSelectedTab } from '../menu/store/menu.selectors';
import { TabDTO, SwiperDTO } from '../../../../shared/clients/api/api.model';
import { SwiperService } from './swiper.service';

@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent implements OnInit, OnDestroy {

  currentPhotos: string[];

  private selectedTab$: Observable<TabDTO>;
  private photos$: Observable<SwiperDTO>;
  private swiper: Swiper;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState>,
    private changeDetectorRef: ChangeDetectorRef,
    private swiperService: SwiperService
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.photos$ = this.store.select(selectPhotos);
  }

  ngOnInit() {
    this.getSwiperPhotos();
    this.setCurrentPhotosBasedOnSelectedTab();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSwiperPhotos(): void {
    this.store.dispatch(new GetPhotos());
  }

  private setCurrentPhotosBasedOnSelectedTab(): void {
    combineLatest(this.selectedTab$, this.photos$)
      .pipe(
        takeUntil(this.destroy$),
        filter(([selectedTab, photos]) => !!selectedTab && !!photos),
        distinctUntilChanged((x: any, y: any) => isEqual(x, y))
      )
      .subscribe(([selectedTab, photos]) => {
        this.currentPhotos = photos[selectedTab.id];
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
      const config = this.swiperService.configuration;
      this.swiper = new Swiper(config.wrapper, config.options);
    } else {
      this.swiper.update();
    }
  }

}
