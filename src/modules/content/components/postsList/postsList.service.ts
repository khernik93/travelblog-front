import { Injectable } from '@angular/core';
import { Meta } from '../../../../shared/clients/api.model';

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
    public getNextStart(meta: Meta): number {
        return meta.end + 1;
    }

    /**
     * Calculate next end index for scrolling more posts
     * @param meta 
     */
    public getNextEnd(meta: Meta): number {
        return meta.end + (meta.end - meta.start) + 1;
    }

}
