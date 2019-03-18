import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, Post, PostContentDTO } from '../../../../shared/clients/backend/backend.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { GetPost, ClearPost } from '../../../content/containers/singlePost/store/singlePost.actions';
import { selectPost } from '../../../content/containers/singlePost/store/singlePost.selectors';
import { EditPost } from './store/editPost.actions';

@Component({
  selector: 'editPost-container',
  template: `
    <postForm-component [tabs$]="tabs$"
                        [post$]="post$"
                        [title]="'Edit post'"
                        [submitText]="'Submit changes'"
                        (onFormSubmit)="editPost($event)">
    </postForm-component>
  `
})
export class EditPostContainer implements OnInit, OnDestroy {

  tabs$: Observable<TabDTO[]>;
  post$: Observable<PostContentDTO>;

  constructor(
    private store: Store<HeaderState>,
    private route: ActivatedRoute
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.post$ = this.store.select(selectPost);
  }

  ngOnInit() {
    this.getTabs();
    this.fetchPostByPostId();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }

  private fetchPostByPostId() {
    this.route.paramMap
      .pipe(take(1))
      .subscribe(params => this.store.dispatch(new GetPost(params.get('postId'))));
  }

  editPost(post: Post) {
    this.store.dispatch(new EditPost(post));
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearPost());
  }

}
