import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Post } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { SetSuccess } from '../../../../app/components/notification/store/notification.actions';
import { AddNewPostService } from '../addNewPost.service';
import { AddNewPostActionTypes, AddNewPostSuccess, AddNewPostError } from './addNewPost.actions';

@Injectable()
export class AddNewPostEffects {

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPost),
      exhaustMap((action: any) => {
        const post: Post = this.addNewPostService.transformPostDisplayIntoPost(action.postDisplay);
        return this.apiClient.addNewPost(post, action.tab)
          .pipe(
            map(() => new AddNewPostSuccess()),
            catchError((error: any) => of(new AddNewPostError(error)))
          )
      })
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
      private addNewPostService: AddNewPostService
    ) { }

}
