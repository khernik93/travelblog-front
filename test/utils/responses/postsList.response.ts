import { PostsDTO } from '../../../src/shared/clients/api/api.model';

export const PostsListResponse: PostsDTO = {
  'meta': {
    'start': 0,
    'end': 2,
    'total': 7
  },
  'content': [
    {
      'id': 1,
      'tab': { 'id': 1, 'name': 'China' },
      'createdAt': '2019-02-01T22:00:51.000+0000',
      'title': 'This is the first post',
      'content': 'post1',
      'tags': ['tag1', 'tag2', 'tag3']
    },
    {
      'id': 2,
      'tab': { 'id': 1, 'name': 'China' },
      'createdAt': '2019-02-02T11:28:23.000+0000',
      'title': 'This is the first post',
      'content': 'post2',
      'tags': []
    },
    {
      'id': 3,
      'tab': { 'id': 1, 'name': 'China' },
      'createdAt': '2019-02-01T22:00:51.000+0000',
      'title': 'This is the first post',
      'content': 'post1',
      'tags': ['tag1', 'tag2', 'tag3']
    },
    {
      'id': 4,
      'tab': { 'id': 1, 'name': 'China' },
      'createdAt': '2019-02-02T11:28:23.000+0000',
      'title': 'This is the first post',
      'content': 'post2',
      'tags': []
    }
  ]
};
