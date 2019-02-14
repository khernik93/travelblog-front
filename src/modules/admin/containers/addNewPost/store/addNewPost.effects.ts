import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, take, catchError } from 'rxjs/operators';
import { PostContentDTO, TabDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { AddNewPostService } from '../addNewPost.service';
import { AddNewPostActionTypes, AddNewPostSuccess, AddNewPostError } from './addNewPost.actions';
import { Store } from '@ngrx/store';
import { selectTabs } from '../../../../header/containers/menu/store/menu.selectors';
import { HeaderState } from '../../../../header/store/header.reducers';

@Injectable()
export class AddNewPostEffects {

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPost),
      exhaustMap((action: any) => this.store.select(selectTabs)
        .pipe(take(1), map((tabs: TabDTO[]) => ({ tabs, action })))
      ),
      map((result: {action: any, tabs: TabDTO[]}) => this.addNewPostService.transformIntoPostContentDTO(result.action.post, result.tabs)),
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
      private apiClient: ApiClient,
      private addNewPostService: AddNewPostService,
      private store: Store<HeaderState>
    ) { }

}
