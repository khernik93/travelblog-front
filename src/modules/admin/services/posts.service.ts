import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HeaderState } from '../../header/store/header.reducers';
import { TabDTO, PostContentDTO, Post } from '../../../shared/clients/api/api.model';
import { selectTabs } from '../../header/containers/menu/store/menu.selectors';

@Injectable()
export class PostsService {

  private tabs$: Observable<TabDTO[]>;

  constructor(
    private store: Store<HeaderState>
  ) { 
    this.tabs$ = this.store.select(selectTabs);
  }

  /**
   * Transform Post model into PostContentDTO in order to make a request to the API
   * @param post 
   * @param tabs 
   * @returns {PostContentDTO}
   */
  transformPostIntoPostContentDTO(post: Post): Observable<PostContentDTO> {
    return this.tabs$
      .pipe(
        take(1),
        map((tabs: TabDTO[]) => tabs.filter(tab => tab.id === post.tabId)[0]),
        map((tab: TabDTO) => this.createPostContentDTO(post, tab))
      );
  }

  private createPostContentDTO(post: Post, tab: TabDTO): PostContentDTO {
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
