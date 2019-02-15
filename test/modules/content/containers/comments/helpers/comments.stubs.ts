import { CommentsService } from '../../../../../src/modules/content/components/comments/comments.service';

export class CommentsStubs {

  static getCommentsServiceStub(): jasmine.SpyObj<CommentsService> {
    return jasmine.createSpyObj('CommentsService', ['removeEmptyValues']);
  }

};
