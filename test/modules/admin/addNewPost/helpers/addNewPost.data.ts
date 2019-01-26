import { NewPostDisplay } from "../../../../../src/modules/admin/components/addNewPost/addNewPost.model";
import { NewPost } from "../../../../../src/shared/clients/api.model";

export const NewPostDisplayData: NewPostDisplay = {
  tabs: 'tab1', 
  tags: 'tag1,tag2,tag3', 
  title: 'title', 
  content: 'content'
};

export const NewPostData: NewPost = {
  tab: 'tab1', 
  tags: ['tag1','tag2','tag3'], 
  title: 'title', 
  content: 'content'
};
