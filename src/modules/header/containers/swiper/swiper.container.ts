import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { GetPhotos } from './store/swiper.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectPhotos } from './store/swiper.selectors';
import { selectSelectedTab } from '../menu/store/menu.selectors';
import { TabDTO, SwiperDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { selectPost } from '../../../content/containers/singlePost/store/singlePost.selectors';

@Component({
  selector: 'swiper-container',
  template: `
    <swiper-component [photosForSelectedTab]="photosForSelectedTab"
                      [post$]="post$"
    >
    </swiper-component>`
})
export class SwiperContainer implements OnInit, OnDestroy {

  photosForSelectedTab: string[];
  post$: Observable<PostContentDTO>;

  private selectedTab$: Observable<TabDTO>;
  private photos$: Observable<SwiperDTO>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState>,
    private ref: ChangeDetectorRef
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.photos$ = this.store.select(selectPhotos);
    this.post$ = this.store.select(selectPost);
  }

  ngOnInit() {
    this.getPhotos();
    this.filterPhotosBySelectedTab();
  }

  /**
   * Get all photos
   */
  private getPhotos(): void {
    this.store.dispatch(new GetPhotos());
  }

  /**
   * Listen to selected tab changes, and filter all photos accordingly
   */
  private filterPhotosBySelectedTab(): void {
    combineLatest(this.selectedTab$, this.photos$)
      .pipe(
        takeUntil(this.destroy$),
        filter(([selectedTab, photos]) => !!selectedTab && !!photos),
        distinctUntilChanged((x: any, y: any) => isEqual(x, y))
      )
      .subscribe(([selectedTab, photos]) => {
        this.photosForSelectedTab = photos[selectedTab.id];
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
