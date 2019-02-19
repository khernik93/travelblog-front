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
  transformPostIntoPostContentDTO(post: Post, tab: TabDTO): PostContentDTO {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tab: tab,
      tags: this.convertTagsStringIntoTagsArray(post.tags)
    };
  }

  private convertTagsStringIntoTagsArray(tags: string): string[] {
    const trimmedTags = tags.replace(/\s/g, '');
    const splitTags = trimmedTags.split(',') || [];
    return splitTags.filter(tag => tag);
  }

}
