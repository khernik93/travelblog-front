import { PostContentDTO } from '../../../src/shared/clients/backend/api.model';

export const RecentPostsResponse: PostContentDTO[] = [
  {
    'tab': { 'id': 1, 'name': 'China' },
    'createdAt': '2019-02-01T22:00:51.000+0000',
    'title': 'This is the first post',
    'content': 'post1',
    'tags': ['tag1', 'tag2', 'tag3']
  },
  {
    'tab': { 'id': 1, 'name': 'China' },
    'createdAt': '2019-02-02T11:28:23.000+0000',
    'title': 'This is the first post',
    'content': 'post2',
    'tags': []
  },
  {
    'tab': { 'id': 1, 'name': 'China' },
    'createdAt': '2019-02-02T11:28:27.000+0000',
    'title': 'This is the first post',
    'content': 'post3',
    'tags': []
  }
];
