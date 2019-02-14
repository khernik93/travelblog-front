import { Injectable } from '@angular/core';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {

  removeEmptyValues(comment: Comment): void {
    for (let propName in comment) {
        if (comment[propName].trim() === '') {
            delete comment[propName];
        }
    }
  }

}
