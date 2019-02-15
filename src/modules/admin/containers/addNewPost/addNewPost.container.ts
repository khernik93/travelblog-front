import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO } from '../../../../shared/clients/api/api.model';
import { AddNewPost } from './store/addNewPost.actions';
import { Post } from './addNewPost.model';

@Component({
  selector: 'addNewPost-container',
  template: `
    <addNewPost-component [tabs$]="tabs$"
                          (onFormSubmit)="addNewPost($event)">
    </addNewPost-component>
  `
})
export class AddNewPostContainer implements OnInit {

  tabs$: Observable<TabDTO[]>;

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
  }

  ngOnInit() {
    this.getTabs();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }
  
  addNewPost(newPost: Post) {
    this.store.dispatch(new AddNewPost(newPost));
  }

}
