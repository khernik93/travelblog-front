import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { selectPost } from './store/singlePost.selectors';
import { ContentState } from '../../store/content.reducers';
import * as SinglePostActions from './store/singlePost.actions';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'singlePost-component',
  styleUrls: ['../postsList/postsList.component.scss', './singlePost.component.scss'],
  templateUrl: './singlePost.component.html'
})
export class SinglePostComponent implements OnInit, OnDestroy {

  post$: Observable<PostContentDTO>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ContentState>,
    private route: ActivatedRoute
  ) { 
    this.post$ = this.store.select(selectPost);
  }

  ngOnInit() {
    this.getPostOnNewRequest();
  }

  private getPostOnNewRequest() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        this.store.dispatch(new SinglePostActions.GetPost(params.get('id').toString()));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
