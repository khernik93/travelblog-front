import { Injectable } from '@angular/core';
import { MetaDTO, TabDTO, PostContentDTO, Post } from '../../../../shared/clients/api/api.model';

@Injectable()
export class PostsListService {

  /**
   * Start index of posts to load initially
   */
  public DEFAULT_START = 0;

  /**
   * End index of posts to load initially
   */
  public DEFAULT_END = 2;

  /**
   * ms debounce when getting more posts on scroll
   */
  public SCROLL_DEBOUNCE = 1000;

  /**
   * Calculate next start index for scrolling more posts
   * @param meta 
   */
  public getNextStart(meta: MetaDTO): number {
    return meta.end + 1;
  }

  /**
   * Calculate next end index for scrolling more posts
   * @param meta 
   */
  public getNextEnd(meta: MetaDTO): number {
    return meta.end + (meta.end - meta.start) + 1;
  }

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
