import { TestBed } from '@angular/core/testing';

import { CommentsService } from '../../../../../src/modules/content/containers/comments/comments.service';
import { Comment } from '../../../../../src/modules/content/containers/comments/comments.model';

describe('CommentsService', () => {

  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsService]
    });
    service = TestBed.get(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN removeEmptyValues is called with an object
    THEN empty values are removed from the object
  `, () => {
      const comment: Comment = {
        name: '   ',
        content: 'some content',
        email: ''
      };
      const expected = {
        content: comment.content
      };
      service.removeEmptyValues(comment);
      expect(comment).toEqual(expected);
    });

});
