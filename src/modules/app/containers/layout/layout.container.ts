import { Component, OnInit, OnDestroy } from '@angular/core';
import isEqual from 'lodash-es/isEqual';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { SelectTabById } from '../../../header/containers/menu/store/menu.actions';

/**
 * It's here instead of AppComponent because it's not global - it doesn't concern admin structure, but
 * only user structure (header-content-footer). And this is what is handled by LayoutComponent (other
 * layout components are responsible for other "pages", eg. AdminLayoutComponent).
 */
@Component({
  selector: 'layout-container',
  template: '<layout-component></layout-component>'
})
export class LayoutContainer implements OnInit, OnDestroy { 

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectTabOnRouteTabIdChanges();
  }

  private selectTabOnRouteTabIdChanges(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((x: any, y: any) => isEqual(x, y)),
        map((params: any) => params.get('tabId'))
      )
      .subscribe((tabId: number) => {
        this.store.dispatch(new SelectTabById(tabId));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
