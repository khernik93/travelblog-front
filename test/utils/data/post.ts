import { TabsResponse } from "../responses/tabs.response";
import { Post, PostContentDTO } from "../../../src/shared/clients/api/api.model";

export const tab = TabsResponse[2];

export const post: Post = {
  id: 1,
  tabId: tab.id,
  tags: 'tag1,tag2,tag3, tag4,,,', 
  title: 'title', 
  content: 'content'
};

export const postContentDTO: PostContentDTO = {
  id: 1,
  tab: tab,
  tags: ['tag1','tag2','tag3','tag4'],
  title: post.title,
  content: post.content
};
