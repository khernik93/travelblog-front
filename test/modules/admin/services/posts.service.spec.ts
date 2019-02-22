import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngrx/store';

import { PostsService } from '../../../../src/modules/admin/services/posts.service';
import { TabsResponse } from '../../../utils/responses/tabs.response';
import { Post, PostContentDTO } from '../../../../src/shared/clients/api/api.model';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { State } from '../../../utils/state/state';

const tab = TabsResponse[2];

const post: Post = {
  id: 1,
  tabId: tab.id,
  tags: 'tag1,tag2,tag3, tag4,,,', 
  title: 'title', 
  content: 'content'
};

const postContentDTO: PostContentDTO = {
  id: 1,
  tab: tab,
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  title: post.title,
  content: post.content
};

describe('PostsService', () => {

  let service: PostsService;
  let store: MockStore<any>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<any>();
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        { provide: Store, useValue: store }
      ]
    });
    service = TestBed.get(PostsService);
  });

  beforeEach(() => {
    store.setState(cloneDeep(State));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN transformPostIntoPostContentDTO is called with Post model
    THEN PostContentDTO model is returned
  `, () => {
    const postContentDTOActual = service.transformPostIntoPostContentDTO(post, tab);
    expect(postContentDTOActual).toEqual(postContentDTO);
  });

});
