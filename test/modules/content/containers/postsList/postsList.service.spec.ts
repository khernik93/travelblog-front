import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store, State } from '@ngrx/store';

import { PostsListService } from '../../../../../src/modules/content/containers/postsList/postsList.service';
import { Post, PostContentDTO } from '../../../../../src/shared/clients/api/api.model';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { tab, post, postContentDTO } from '../../../../utils/data/post';

describe('PostsListService', () => {

  let service: PostsListService;
  let store: MockStore<any>;
  let ClonedPost: Post;
  let ClonedPostContentDTO: PostContentDTO;

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
    ClonedPost = cloneDeep(post);
    ClonedPostContentDTO = cloneDeep(postContentDTO);
    store.setState(cloneDeep(State));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN transformPostIntoPostContentDTO is called with Post model
    THEN PostContentDTO model is returned
  `, () => {
    const postContentDTO = service.transformPostIntoPostContentDTO(ClonedPost, tab);
    expect(postContentDTO).toEqual(ClonedPostContentDTO);
  });

});
