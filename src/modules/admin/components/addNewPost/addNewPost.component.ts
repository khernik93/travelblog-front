import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/components/menu/store/menu.selectors';
import { GetTabs } from '../../../header/components/menu/store/menu.actions';
import { Tab } from '../../../../shared/clients/api/api.model';
import { AddNewPost } from './store/addNewPost.actions';

@Component({
  selector: 'addNewPost-component',
  templateUrl: './addNewPost.component.html',
  styleUrls: ['./addNewPost.component.scss']
})
export class AddNewPostComponent implements OnInit {

  // Tabs options
  tabs$: Observable<Tab[]>;
  // Content taken from wysiwyg
  content: string = '';
  // Basic form controls
  addNewPostForm: FormGroup;

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
  }

  ngOnInit() {
    this.addNewPostForm = new FormGroup({
      tab: new FormControl(''),
      title: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });

    this.setFirstTab();
    this.store.dispatch(new GetTabs());
  }

  private setFirstTab() {
    this.tabs$.pipe(map((tabs: Tab[]) => tabs[0]))
    .subscribe((tab: Tab) => this.addNewPostForm.get('tab').setValue(tab));
  }

  synchronizeContent(content: string) {
    this.content = content;
  }
  
  addNewPost() {
    this.store.dispatch(new AddNewPost(
      {
        tags: this.addNewPostForm.value.tags,
        title: this.addNewPostForm.value.title,
        content: this.content
      }, 
      this.addNewPostForm.value.tab
    ));
  }

  isInvalid(control: string): boolean {
    return !!(!this.addNewPostForm.get(control).valid && this.addNewPostForm.get(control).touched);
  }

}
