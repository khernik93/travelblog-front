import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, Post } from '../../../../shared/clients/api/api.model';
import { AddNewPost } from '../../../content/containers/postsList/store/postsList.actions';

@Component({
  selector: 'addNewPost-container',
  template: `
    <postForm-component [tabs$]="tabs$"
                        [title]="'Add new post'"
                        [submitText]="'Add new post'"
                        (onFormSubmit)="addNewPost($event)">
    </postForm-component>
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
