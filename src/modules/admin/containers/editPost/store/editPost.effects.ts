import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, map, take } from 'rxjs/operators';
import { TabDTO, PostContentDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';

import {
  EditPostSuccess,
  EditPostError,
  EditPostActionTypes
} from './editPost.actions';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { HeaderState } from '../../../../header/store/header.reducers';
import { Store } from '@ngrx/store';
import { selectTabs } from '../../../../header/containers/menu/store/menu.selectors';
import { PostsService } from '../../../services/posts.service';

@Injectable()
export class EditPostEffects {

  @Effect()
  editPost$: Observable<any> = this.actions$
    .pipe(
      ofType(EditPostActionTypes.EditPost),
      exhaustMap((action: any) => (
        this.store.select(selectTabs)
          .pipe(
            take(1),
            map((tabs: TabDTO[]) => tabs.filter(tab => tab.id === action.post.tabId)[0]),
            map((tab: TabDTO) => this.postsService.transformPostIntoPostContentDTO(action.post, tab))
          )
      )),
      exhaustMap((postContentDTO: PostContentDTO) => (
        this.apiClient.updatePost(postContentDTO)
          .pipe(
            map(() => new EditPostSuccess()),
            catchError(() => of(new EditPostError()))
          )
      ))
    );

  @Effect()
  editPostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(EditPostActionTypes.EditPostSuccess),
      map(() => new SetSuccess('Post edited successfully!'))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient,
    private postsService: PostsService,
    private store: Store<HeaderState>
  ) { }

}
