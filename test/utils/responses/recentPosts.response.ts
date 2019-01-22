import { Post } from '../../../src/shared/clients/api.model';

export const RecentPostsResponse: Post[] = [
  {"id": 1, "createdAt": "123", "title": "test_title_1", "tags": ["tag1"],"content": "test", "commentsCount": 2},
  {"id": 2, "createdAt": "1234", "title": "test_title_2", "tags": ["tag2", "tag3"], "content": "test", "commentsCount": 3}
];
