import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { ManagePostsService } from '../../../../../src/modules/admin/containers/managePosts/managePosts.service';
import { PostContentDTO, TabDTO, Post } from '../../../../../src/shared/clients/api/api.model';
import { TabsResponse } from '../../../../utils/responses/tabs.response';

const post: Post = {
  tabId: TabsResponse[2].id,
  tags: 'tag1,tag2,tag3, tag4,,,', 
  title: 'title', 
  content: 'content'
};

const postContentDTO: PostContentDTO = {
  tab: TabsResponse[2],
  tags: ['tag1','tag2','tag3','tag4'],
  title: post.title, 
  content: post.content
};

const tabsResponse = TabsResponse;

describe('AddNewPostService', () => {

  let service: ManagePostsService;

  let ClonedPost: Post;
  let ClonedPostContentDTO: PostContentDTO;
  let ClonedTabsResponse: TabDTO[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagePostsService]
    });
    service = TestBed.get(ManagePostsService);
  });

  beforeEach(() => {
    ClonedPost = cloneDeep(post);
    ClonedPostContentDTO = cloneDeep(postContentDTO);
    ClonedTabsResponse = cloneDeep(tabsResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN transformNewPost is called with a display addNewPost object
    THEN API addNewPost object is returned
  `, () => {
    const transformedNewPost = service.transformPostIntoPostContentDTO(ClonedPost, ClonedTabsResponse);
    expect(transformedNewPost).toEqual(ClonedPostContentDTO);
  });

});
