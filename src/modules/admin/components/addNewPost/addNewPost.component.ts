import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/components/menu/store/menu.selectors';
import { GetTabs } from '../../../header/components/menu/store/menu.actions';
import { TabDTO } from '../../../../shared/clients/api/api.model';
import { AddNewPost } from './store/addNewPost.actions';

@Component({
  selector: 'addNewPost-component',
  templateUrl: './addNewPost.component.html',
  styleUrls: ['./addNewPost.component.scss']
})
export class AddNewPostComponent implements OnInit {

  tabs$: Observable<TabDTO[]>;
  content: string = ''; // wysiwyg
  addNewPostForm: FormGroup;

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
  }

  ngOnInit() {
    this.addNewPostForm = this.buildAddNewPostForm();
    this.selectFirstTab();
    this.store.dispatch(new GetTabs());
  }

  private buildAddNewPostForm(): FormGroup {
    return new FormGroup({
      tabId: new FormControl(''),
      title: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

  private selectFirstTab() {
    this.tabs$
      .pipe(
        filter((tabs: TabDTO[]) => tabs.length > 0),
        map((tabs: TabDTO[]) => tabs[0].id)
      )
      .subscribe((firstTabId: number) => (
        this.addNewPostForm.get('tabId').setValue(firstTabId)
      ));
  }

  synchronizeContent(content: string) {
    this.content = content;
  }
  
  addNewPost() {
    this.store.dispatch(new AddNewPost(
      { 
        ...this.addNewPostForm.value,
        tabId: +this.addNewPostForm.value.tabId,
        content: this.content 
      }
    ));
  }

  isInvalid(control: string): boolean {
    const isValid = this.addNewPostForm.get(control).valid;
    const isTouched = this.addNewPostForm.get(control).touched;
    return !isValid && isTouched;
  }

}
