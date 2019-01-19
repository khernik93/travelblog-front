import { Post } from '../../../src/modules/content/components/postsList/postsList.model';

const recentPostsResponse: Post[] = [
  {"id": 1, "createdAt": "123", "title": "test_title_1", "tags": ["tag1"],"content": "test", "commentsCount": 2},
  {"id": 2, "createdAt": "1234", "title": "test_title_2", "tags": ["tag2", "tag3"], "content": "test", "commentsCount": 3}
];

export default recentPostsResponse;
