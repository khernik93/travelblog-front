import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { NewPost } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';
import { AddNewPostActionTypes, AddNewPostSuccess, AddNewPostError } from './addNewPost.actions';
import { SetSuccess } from '../../../../app/components/notification/store/notification.actions';
import { NewPostDisplay } from '../addNewPost.model';
import { AddNewPostService } from '../addNewPost.service';

@Injectable()
export class AddNewPostEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private addNewPostService: AddNewPostService
  ) { }

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPost),
      map((action: {newPost: NewPostDisplay}) => this.addNewPostService.transformNewPost(action.newPost)),
      exhaustMap((transformedNewPost: NewPost) => this.apiClient.addNewPost(transformedNewPost)),
      map(() => new AddNewPostSuccess()),
      catchError((error: any) => of(new AddNewPostError(error)))
    );

  @Effect()
  addNewPostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPostSuccess),
      map(() => new SetSuccess("The post was added successfully!"))
    );

}
