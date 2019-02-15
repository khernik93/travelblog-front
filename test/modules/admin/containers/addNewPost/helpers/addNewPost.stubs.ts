import { AddNewPostService } from '../../../../../../src/modules/admin/containers/addNewPost/addNewPost.service';

export class AddNewPostStubs {

  static getAddNewPostServiceStub(): jasmine.SpyObj<AddNewPostService> {
    return jasmine.createSpyObj('AddNewPostService', {
      transformIntoPostContentDTO: () => ({})
    });
  }

};
