import { CommentsResponse } from '../../../../utils/responses/comments.response';

export const CommentsState: any = {
  content: {
    comments: {
      comments: CommentsResponse
    },
    singlePost: {
      post: {
        id: 1 // ID doesnt matter as we dont send it to the backend in the test anyway
      }
    }
  }
};
