import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { AdminRoutes, adminRoutes } from '../../routing/adminRouting.routes';

@Component({
  selector: 'postsTable-component',
  templateUrl: 'postsTable.component.html',
  styleUrls: ['../../admin.component.scss', './postsTable.component.scss']
})
export class PostsTableComponent implements OnInit, OnDestroy { 

  @Input() tabs$: Observable<TabDTO[]>;
  @Input() selectedTab$: Observable<TabDTO>;
  @Input() posts$: Observable<PostContentDTO[]>;
  @Input() loading$: Observable<boolean>;
  @Output('onTabChanges') onTabChangesEmitter = new EventEmitter<string>();
  @Output('onDeletePost') onDeletePostEmitter = new EventEmitter<number>();

  tabsForm: FormGroup;
  adminRoutes: AdminRoutes = adminRoutes;

  private destroy$ = new Subject();

  ngOnInit() {
    this.buildTabsForm();
    this.onTabsFormChanges();
  }

  private buildTabsForm(): void {
    this.tabsForm = new FormGroup({
      tabId: new FormControl(0, Validators.min(1))
    });
    this.selectOptionBasedOnSelectedTab();
  }

  private selectOptionBasedOnSelectedTab() {
    this.selectedTab$
      .pipe(
        takeUntil(this.destroy$), 
        filter((selectedTab: TabDTO) => !!selectedTab)
      )
      .subscribe((selectedTab: TabDTO) => {
        this.tabsForm.controls['tabId'].patchValue(selectedTab.id.toString());
      });
  }

  private onTabsFormChanges() {
    this.tabsForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((x, y) => isEqual(x, y))
      )
      .subscribe(val => {
        this.onTabChangesEmitter.emit(val);
      });
  }

  deletePost(postId: number) {
    this.onDeletePostEmitter.emit(postId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
