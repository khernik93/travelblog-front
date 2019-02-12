import { AddNewPostService } from '../../../../../src/modules/admin/components/addNewPost/addNewPost.service';

export class AddNewPostStubs {

  static getAddNewPostServiceStub(): jasmine.SpyObj<AddNewPostService> {
    return jasmine.createSpyObj('AddNewPostService', {
      transformIntoPostContentDTO: () => ({})
    });
  }

};
