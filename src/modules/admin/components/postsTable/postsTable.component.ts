import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'postsTable-component',
  templateUrl: 'postsTable.component.html',
  styleUrls: ['../../admin.component.scss', './postsTable.component.scss']
})
export class PostsTableComponent { 

  @Input() tabs$: Observable<TabDTO[]>;
  @Input() selectedTabId$: Observable<number>;
  @Input() posts$: Observable<PostContentDTO[]>;

  @Output('onTabChanges') onTabChangesEmitter = new EventEmitter<string>();

  tabsForm: FormGroup;

  routes: any = {
    edit: (tabId, postId) => `/admin/editPost/${tabId}/${postId}`
  };

  ngOnInit() {
    this.buildTabsForm();
    this.onTabsFormChanges();
  }

  private buildTabsForm(): void {
    this.tabsForm = new FormGroup({
      tabId: new FormControl(0, Validators.min(1))
    });
    this.selectedTabId$
      .subscribe((selectedTabId: number) => this.tabsForm.controls['tabId'].patchValue(selectedTabId));
  }

  private onTabsFormChanges() {
    this.tabsForm.valueChanges
      .subscribe(val => this.onTabChangesEmitter.emit(val));
  }

}
