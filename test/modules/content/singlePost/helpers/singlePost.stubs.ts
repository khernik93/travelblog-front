import { of } from "rxjs";

export class SinglePostStubs {

  static postId: string = "1";

  static getActivatedRoute() {
    return {
      paramMap: of({get: () => SinglePostStubs.postId})
    };
  }

};
