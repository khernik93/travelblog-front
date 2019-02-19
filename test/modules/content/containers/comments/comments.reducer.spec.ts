import { AddCommentSuccess } from '../../../../../src/modules/content/containers/comments/store/comments.actions';
import { CommentDTO } from '../../../../../src/shared/clients/api/api.model';
import { commentsReducer, initialState } from '../../../../../src/modules/content/containers/comments/store/comments.reducer';

describe('CommentsReducer', () => {

  it(`
    WHEN AddCommentSuccess action is dispatched with a new comment
    THEN new comment is prepended to the comments array
  `, () => {
      const newComment: CommentDTO = {
        id: 1,
        createdAt: '',
        name: '',
        email: '',
        content: ''
      };
      const action = new AddCommentSuccess(newComment);
      const result = commentsReducer(initialState, action);
      expect(result).toEqual({ ...initialState, comments: [newComment].concat(initialState.comments) });
    });

});
