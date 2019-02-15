import { TabsResponse } from '../../../../../utils/responses/tabs.response';
import { PostsListResponse } from '../../../../../utils/responses/postsList.response';

export const INITIALLY_SELECTED_TAB = TabsResponse[0];

export const PostsListState: any = {
  header: {
    menu: {
      selectedTab: INITIALLY_SELECTED_TAB
    }
  },
  content: {
    postsList: {
      posts: PostsListResponse.content
    }
  }
};
