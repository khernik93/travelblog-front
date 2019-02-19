import { of } from "rxjs";
import { State } from "../state/state";

export class AdminStubs {

  static postId = State.content.singlePost.post.id.toString();

  static activatedRoute(): any {
    return {
      paramMap: of({ get: (paramName) => {
        switch (paramName) {
          case 'postId': {
            return AdminStubs.postId;
          }
        }
      }})
    };
  }

};
