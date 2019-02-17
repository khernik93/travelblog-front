import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, Post, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { AdminState } from '../../store/admin.reducers';
import { selectAdminPosts } from '../managePosts/store/managePosts.selectors';
import { ActivatedRoute } from '@angular/router';
import { map, exhaustMap, filter, take, takeUntil } from 'rxjs/operators';
import { GetPosts } from '../managePosts/store/managePosts.actions';

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
  posts$: Observable<PostContentDTO[]>;
  post$ = new Subject();

  private destroy$ = new Subject();

  constructor(
    private store: Store<HeaderState | AdminState>,
    private route: ActivatedRoute
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.posts$ = this.store.select(selectAdminPosts);
  }

  ngOnInit() {
    this.getTabs();
    this.getPosts();
    this.fetchPostByParamPostId();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }

  private getPosts() {
    this.route.paramMap
      .pipe(
        take(1),
        map((params: any) => params.get('tabId'))
      )
      .subscribe((tabId: number) => this.store.dispatch(new GetPosts(tabId)));
  }

  private fetchPostByParamPostId() {
    this.route.paramMap
      .pipe(
        take(1),
        map((params: any) => params.get('postId')),
        exhaustMap((postId: number) => this.getPostByPostId(postId))
      )
      .subscribe((post: PostContentDTO) => {
        this.store.dispatch(new GetPosts(post.tab.id));
        this.post$.next(post);
      });
  }

  private getPostByPostId(postId: number) {
    return this.posts$
      .pipe(
        takeUntil(this.destroy$),
        filter((posts: PostContentDTO[]) => !!posts),
        map((posts: PostContentDTO[]) => posts.filter(post => post.id == postId)[0])
      )
  }

  editPost(editedPost: Post) {
    //this.store.dispatch(new AddNewPost(newPost));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
