import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { TransferHttpService } from '../../services/transferHttp.service';
import { AuthCredentials } from '../../../modules/auth/auth.model';
import constants from '../../../config/constants';
import { 
  PostsPaginable, 
  Tab, 
  Photos,
  Post
} from './api.model';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from '../../services/cookie.service';
import { map } from 'rxjs/operators';

const ROUTES: any = {
  posts: '/post/tab',
  recentPosts: '/post/recent',
  post: '/post',
  tabs: '/tab',
  photos: '/swiper',
  addNewPost: '/post',
  signIn: '/auth/signIn'
};

@Injectable()
export class ApiClient {

  private headers: HttpHeaders;

  constructor(
    private transferHttpService: TransferHttpService,
    private cookieService: CookieService
  ) { 
    this.initializeHeaders();
  }

  private initializeHeaders() {
    this.headers = new HttpHeaders()
      .set('X-Api-Key', 'aaa');
  }

  getRecentPosts(): Observable<Post[]> {
    const url = this.prepareUrl(ROUTES.recentPosts);
    return this.transferHttpService.get(url, {
      headers: this.headers
    })
    .pipe(
      map((response: any) => response.postContents)
    );
  }

  getPosts(tabId: number, params: {start: number, end: number}): Observable<PostsPaginable> {
    const url = this.prepareUrl(ROUTES.posts);
    return this.transferHttpService.get(`${url}/${tabId}`, {
      params: { 
        start: params.start.toString(),
        end: params.end.toString() 
      }, 
      headers: this.headers
    });
  }

  getPost(id: string): Observable<Post> {
    const url = this.prepareUrl(ROUTES.post);
    return this.transferHttpService.get(`${url}/${id}`, {
      headers: this.headers
    });
  }

  getTabs(): Observable<Tab[]> {
    const url = this.prepareUrl(ROUTES.tabs);
    return this.transferHttpService.get(url, {
      headers: this.headers
    })
      .pipe(
        map((response: any) => response.tabs)
      );
  }

  getPhotos(): Observable<Photos> {
    const url = this.prepareUrl(ROUTES.photos);
    return this.transferHttpService.get(url, {
      headers: this.headers
    });
  }

  addNewPost(post: Post, tab: Tab): Observable<void> {
    const url = this.prepareUrl(ROUTES.addNewPost);
    const headers = this.headers
      .append('Authorization', this.cookieService.getCookie('SESSION_ID'));
    return this.transferHttpService.post(url, { 
      ...post, 
      tab 
    }, {
      headers: headers
    });
  }

  signIn(credentials: AuthCredentials): Observable<void> {
    const url = this.prepareUrl(ROUTES.signIn);
    return this.transferHttpService.post(url, credentials, {
      withCredentials: true,
      headers: this.headers
    });
  }

  /**
   * Build absolute URL based on a path
   * @param uri 
   */
  private prepareUrl(uri: string) {
    return constants.apiUrl + uri;
  }

}