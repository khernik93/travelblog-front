import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { AddNewPostService } from '../../../../src/modules/admin/components/addNewPost/addNewPost.service';
import { NewPostDisplayData, NewPostData } from './helpers/addNewPost.data';

describe('AddNewPostService', () => {

  let service: AddNewPostService;

  let ClonedNewPostDispayData: typeof NewPostDisplayData;
  let ClonedNewPostData: typeof NewPostData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewPostService]
    });
    service = TestBed.get(AddNewPostService);
  });

  beforeEach(() => {
    ClonedNewPostDispayData = cloneDeep(NewPostDisplayData);
    ClonedNewPostData = cloneDeep(NewPostData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`
    WHEN transformNewPost is called with a display addNewPost object
    THEN API addNewPost object is returned
  `, () => {
    const transformedNewPost = service.transformNewPost(ClonedNewPostDispayData);
    expect(transformedNewPost).toEqual(ClonedNewPostData);
  });

  it(`
    WHEN transformNewPost is called with a display addNewPost object
    AND tags have a trailing coma
    THEN API addNewPost object is returned properly
  `, () => {
    const actual = ClonedNewPostDispayData;
    actual.tags = actual.tags + ',';
    const transformedNewPost = service.transformNewPost(actual);
    expect(transformedNewPost).toEqual(ClonedNewPostData);
  });

});
