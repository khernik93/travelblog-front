import { TabsResponse } from '../responses/tabs.response';
import { HeaderState } from '../../../src/modules/header/store/header.reducers';
import { PhotosResponse } from '../responses/photos.response';
import { ContentState } from '../../../src/modules/content/store/content.reducers';
import { PostsListResponse } from '../responses/postsList.response';
import { CommentsResponse } from '../responses/comments.response';
import { SinglePostResponse } from '../responses/singlePost.response';
import { RecentPostsResponse } from '../responses/recentPosts.response';
import { AppState } from '../../../src/modules/app/store/app.reducers';
import { NotificationType } from '../../../src/modules/app/containers/notification/notification.model';

export const State: {
  header: HeaderState,
  content: ContentState,
  app: AppState
} = {
  app: {
    router: null,
    notification: {
      notification: {
        message: 'first notification',
        type: NotificationType.error
      }
    }
  },
  header: {
    menu: {
      tabs: TabsResponse,
      selectedTab: TabsResponse[0]
    },
    swiper: {
      photos: PhotosResponse
    }
  },
  content: {
    postsList: {
      posts: PostsListResponse.content,
      initialized: true,
      loading: false,
      meta: null
    },
    comments: {
      comments: CommentsResponse
    },
    singlePost: {
      post: SinglePostResponse
    },
    recentPosts: {
      recentPosts: RecentPostsResponse
    }
  }
};
