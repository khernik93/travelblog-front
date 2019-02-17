import { Injectable } from '@angular/core';
import { TabDTO, PostContentDTO, Post } from '../../../shared/clients/api/api.model';

@Injectable()
export class PostsService {

  /**
   * Transform Post model into PostContentDTO in order to make a request to the API
   * @param post 
   * @param tabs 
   * @returns {PostContentDTO}
   */
  transformPostIntoPostContentDTO(post: Post, tabs: TabDTO[]): PostContentDTO {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tab: this.findTabByTabId(post.tabId, tabs),
      tags: this.convertTagsStringIntoTagsArray(post.tags)
    };
  }

  private findTabByTabId(tabId: number, tabs: TabDTO[]): TabDTO {
    return tabs.filter((tab: TabDTO) => tab.id === tabId)[0];
  }

  private convertTagsStringIntoTagsArray(tags: string): string[] {
    const trimmedTags = tags.replace(/\s/g, '');
    const splitTags = trimmedTags.split(',') || [];
    return splitTags.filter(tag => tag);
  }

}
