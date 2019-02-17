import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'postsTable-component',
  templateUrl: 'postsTable.component.html',
  styleUrls: ['../../admin.component.scss', './postsTable.component.scss']
})
export class PostsTableComponent implements OnInit, OnDestroy { 

  @Input() tabs$: Observable<TabDTO[]>;
  @Input() adminSelectedTabId$: Observable<number>;
  @Input() adminPosts$: Observable<PostContentDTO[]>;

  @Output('onTabChanges') onTabChangesEmitter = new EventEmitter<string>();

  tabsForm: FormGroup;

  routes: any = {
    edit: (tabId, postId) => `/admin/editPost/tabId/${tabId}/postId/${postId}`
  };

  private destroy$ = new Subject();

  ngOnInit() {
    this.buildTabsForm();
    this.selectDefaultTabOnAdminSelectedTabIdChanges();
    this.onTabsFormChanges();
  }

  private buildTabsForm(): void {
    this.tabsForm = new FormGroup({
      tabId: new FormControl(0, Validators.min(1))
    });
  }

  private selectDefaultTabOnAdminSelectedTabIdChanges() {
    this.adminSelectedTabId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedTabId: number) => this.tabsForm.controls['tabId'].patchValue(selectedTabId));
  }

  private onTabsFormChanges() {
    this.tabsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => this.onTabChangesEmitter.emit(val));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
