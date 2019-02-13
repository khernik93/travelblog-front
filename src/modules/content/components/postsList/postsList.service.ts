import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { MetaDTO, PostsDTO } from '../../../../shared/clients/api/api.model';

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

}
