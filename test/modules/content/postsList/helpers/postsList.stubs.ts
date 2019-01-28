import { Store } from '@ngrx/store';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { of } from 'rxjs';

export class PostsListStubs {

  static getStoreStub(): jasmine.SpyObj<Store<ContentState>> {
    return jasmine.createSpyObj('Store', {
      select: of(true)
    });
  }

};
