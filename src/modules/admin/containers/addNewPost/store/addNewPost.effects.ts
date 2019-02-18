import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { PostContentDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { AddNewPostActionTypes, AddNewPostSuccess, AddNewPostError } from './addNewPost.actions';
import { PostsService } from '../../../services/posts.service';

@Injectable()
export class AddNewPostEffects {

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(AddNewPostActionTypes.AddNewPost),
      exhaustMap((action: any) => this.postsService.transformPostIntoPostContentDTO(action.post)),
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
    private postsService: PostsService
  ) { }

}
