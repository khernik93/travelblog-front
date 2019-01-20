import tabsResponse from '../responses/tabs';
import postsListResponse from '../responses/postsList';

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
