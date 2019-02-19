import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store, State } from '@ngrx/store';

import { PostsListService } from '../../../../../src/modules/content/containers/postsList/postsList.service';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('PostsListService', () => {

  let service: PostsListService;
  let store: MockStore<any>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<any>();
    TestBed.configureTestingModule({
      providers: [
        PostsListService,
        { provide: Store, useValue: store }
      ]
    });
    service = TestBed.get(PostsListService);
  });

  beforeEach(() => {
    store.setState(cloneDeep(State));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
