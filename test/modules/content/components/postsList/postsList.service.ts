import { TransferHttpService } from '../../../../../src/shared/services/transfer-http.service';
import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';

describe('PostsListService', () => {

  let postsListService: any;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {
    transferHttpService = jasmine.createSpyObj('TransferHttpService', ['get']);
    postsListService = new PostsListService(<any> transferHttpService);
  });

  it('should call TransferHttpService on calling getPosts method', () => {
    const tabName = 'sample_tab';
    postsListService.getPosts(tabName);
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
