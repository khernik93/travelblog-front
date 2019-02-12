import { Injectable } from '@angular/core';
import { Post } from './addNewPost.model';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';

@Injectable()
export class AddNewPostService {

  transformIntoPostContentDTO(post: Post, tabs: TabDTO[]): PostContentDTO {
    return {
      title: post.title,
      content: post.content,
      tab: this.findTabById(post.tabId, tabs),
      tags: this.convertTagsStringIntoArray(post.tags)
    };
  }

  private findTabById(tabId: number, tabs: TabDTO[]): TabDTO {
    return tabs
      .filter((tab: TabDTO) => tab.id === tabId)[0];
  }

  private convertTagsStringIntoArray(tags: string): string[] {
    const trimmedTags = tags.replace(/\s/g, '');
    const splitTags = trimmedTags.split(',') || [];
    return splitTags.filter(tag => tag);
  }

}
