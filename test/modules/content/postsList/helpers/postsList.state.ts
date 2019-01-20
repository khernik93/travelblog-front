import tabsResponse from '../../../../utils/responses/tabs.response';
import postsListResponse from '../../../../utils/responses/postsList.response';

export const INITIALLY_SELECTED_TAB = tabsResponse[0];

const postsListState: any = {
  header: {
    menu: {
      selectedTab: INITIALLY_SELECTED_TAB
    }
  },
  content: {
    postsList: {
      posts: postsListResponse.content
    }
  }
};

export default postsListState;
