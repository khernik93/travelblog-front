import { Injectable } from '@angular/core';
import { PostDisplay } from './addNewPost.model';
import { Post } from '../../../../shared/clients/api.model';

@Injectable()
export class AddNewPostService {

  transformPostDisplayIntoPost(postDisplay: PostDisplay): Post {
    return {
      title: postDisplay.title,
      tags: this.sanitizeTags(postDisplay.tags),
      content: postDisplay.content
    };
  }

  private sanitizeTags(tags: string): string[] {
    const splitTags = tags.split(",") || [];
    return splitTags.filter(tag => tag);
  }

}
