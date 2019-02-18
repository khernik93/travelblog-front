import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { PostContentDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';

import { 
  EditPostSuccess,
  EditPostError,
  EditPostActionTypes
} from './editPost.actions';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { PostsService } from '../../../services/posts.service';

@Injectable()
export class EditPostEffects {

  @Effect()
  editPost$: Observable<any> = this.actions$
    .pipe(
      ofType(EditPostActionTypes.EditPost),
      exhaustMap((action: any) => this.postsService.transformPostIntoPostContentDTO(action.post)),
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
    private apiClient: ApiClient,
    private postsService: PostsService
  ) { }

}
