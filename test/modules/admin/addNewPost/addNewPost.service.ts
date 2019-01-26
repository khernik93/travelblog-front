import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { AddNewPostService } from '../../../../src/modules/admin/components/addNewPost/addNewPost.service';
import { PostDisplay } from '../../../../src/modules/admin/components/addNewPost/addNewPost.model';
import { Post } from '../../../../src/shared/clients/api.model';

const postDisplay: PostDisplay = {
  tags: 'tag1,tag2,tag3', 
  title: 'title', 
  content: 'content'
};

const post: Post = {
  tags: ['tag1','tag2','tag3'], 
  title: 'title', 
  content: 'content'
};

describe('AddNewPostService', () => {

  let service: AddNewPostService;

  let ClonedPostDispay: PostDisplay;
  let ClonedPost: Post;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewPostService]
    });
    service = TestBed.get(AddNewPostService);
  });

  beforeEach(() => {
    ClonedPostDispay = cloneDeep(postDisplay);
    ClonedPost = cloneDeep(post);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN transformNewPost is called with a display addNewPost object
    THEN API addNewPost object is returned
  `, () => {
    const transformedNewPost = service.transformPostDisplayIntoPost(ClonedPostDispay);
    expect(transformedNewPost).toEqual(ClonedPost);
  });

  it(`
    WHEN transformNewPost is called with a display addNewPost object
    AND tags have a trailing coma
    THEN API addNewPost object is returned properly
  `, () => {
    const actual = ClonedPostDispay;
    actual.tags = actual.tags + ',';
    const transformedNewPost = service.transformPostDisplayIntoPost(actual);
    expect(transformedNewPost).toEqual(ClonedPost);
  });

});
