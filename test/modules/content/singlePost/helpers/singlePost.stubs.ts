import { of } from "rxjs";
import { SinglePostResponse } from '../../../../utils/responses/singlePost.response';

export class SinglePostStubs {

  static getActivatedRoute() {
    return {
      paramMap: of({get: () => SinglePostResponse.id})
    };
  }

};
