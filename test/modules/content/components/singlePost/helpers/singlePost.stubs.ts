import { of } from "rxjs";
import singlePostResponse from '../../../../../utils/responses/singlePost.response';

export class SinglePostStubs {

  static getActivatedRoute() {
    return {
      paramMap: of({get: () => singlePostResponse.id})
    };
  }

  static getSinglePostService() {
    return jasmine.createSpyObj('SinglePostService', {
      getPost: of(singlePostResponse)
    });
  }

};
