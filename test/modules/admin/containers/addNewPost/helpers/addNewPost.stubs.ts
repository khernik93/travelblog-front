import { ManagePostsService } from '../../../../../../src/modules/admin/containers/managePosts/managePosts.service';

export class AddNewPostStubs {

  static getAddNewPostServiceStub(): jasmine.SpyObj<ManagePostsService> {
    return jasmine.createSpyObj('ManagePostsService', {
      transformPostIntoPostContentDTO: () => ({})
    });
  }

};
