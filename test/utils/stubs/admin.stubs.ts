import { of } from 'rxjs';
import { State } from '../state/state';
import { PostsService } from '../../../src/modules/admin/services/posts.service';

export class AdminStubs {

  static postId = State.content.singlePost.post.id.toString();

  static activatedRoute(): any {
    return {
      paramMap: of({ get: () => AdminStubs.postId })
    };
  }

  static postsService(): jasmine.SpyObj<PostsService> {
    return jasmine.createSpyObj('PostsListService', {
      transformPostIntoPostContentDTO: () => ({})
    });
  }

}
