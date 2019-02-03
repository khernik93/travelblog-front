import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { selectPost } from './store/singlePost.selectors';
import { ContentState } from '../../store/content.reducers';
import * as SinglePostActions from './store/singlePost.actions';
import { Post } from '../../../../shared/clients/api.model';

@Component({
  selector: 'singlePost-component',
  styleUrls: ['../postsList/postsList.component.scss', './singlePost.component.scss'],
  templateUrl: './singlePost.component.html'
})
export class SinglePostComponent implements OnInit, OnDestroy {

  post$: Observable<Post>;

  private alive = true;

  constructor(
    private store: Store<ContentState>,
    private route: ActivatedRoute
  ) { 
    this.post$ = this.store.select(selectPost);
  }

  ngOnInit() {
    this.getPostOnNewRequest();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getPostOnNewRequest() {
    this.route.paramMap
      .pipe(takeWhile(() => this.alive))
      .subscribe((params: any) => {
        this.store.dispatch(new SinglePostActions.GetPost(params.get('id').toString()));
      });
  }

}
