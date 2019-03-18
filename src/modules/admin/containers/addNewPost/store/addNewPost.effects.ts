import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, take } from 'rxjs/operators';
import { PostContentDTO, TabDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { AddNewPostActionTypes, AddNewPostSuccess, AddNewPostError } from './addNewPost.actions';
import { PostsService } from '../../../services/posts.service';
import { selectTabs } from '../../../../header/containers/menu/store/menu.selectors';
import { Store } from '@ngrx/store';
import { HeaderState } from '../../../../header/store/header.reducers';

@Injectable()
export class AddNewPostEffects {

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPost),
      exhaustMap((action: any) => (
        this.store.select(selectTabs)
          .pipe(
            take(1),
            map((tabs: TabDTO[]) => tabs.filter(tab => tab.id === action.post.tabId)[0]),
            map((tab: TabDTO) => this.postsService.transformPostIntoPostContentDTO(action.post, tab))
          )
      )),
      exhaustMap((postContentDTO: PostContentDTO) => (
        this.apiClient.addNewPost(postContentDTO)
          .pipe(
            map(() => new AddNewPostSuccess()),
            catchError(() => of(new AddNewPostError()))
          )
      ))
    );

  @Effect()
  addNewPostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPostSuccess),
      map(() => new SetSuccess("The post was added successfully!"))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient,
    private postsService: PostsService,
    private store: Store<HeaderState>
  ) { }

}
