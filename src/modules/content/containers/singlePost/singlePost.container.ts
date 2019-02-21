import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { selectPost } from './store/singlePost.selectors';
import { ContentState } from '../../store/content.reducers';
import { ClearPost, GetPost } from './store/singlePost.actions';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'singlePost-container',
  template: `
    <singlePost-component [post$]="post$"></singlePost-component>
  `
})
export class SinglePostContainer implements OnInit, OnDestroy {

  post$: Observable<PostContentDTO>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ContentState>,
    private route: ActivatedRoute
  ) { 
    this.post$ = this.store.select(selectPost);
  }

  ngOnInit() {
    this.getPostOnParamChange();
  }

  private getPostOnParamChange() {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params: any) => params.get('postId')),
        filter((postId: string) => !!postId)
      )
      .subscribe((postId: string) => {
        this.store.dispatch(new GetPost(postId));
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearPost());
    this.destroy$.next();
    this.destroy$.complete();
  }

}
