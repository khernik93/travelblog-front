import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { ClientServiceI } from '../interfaces/clientService.interface';
import { CookieService } from '../../services/cookie.service';
import { AuthService } from '../../../modules/auth/auth.service';

let ROUTES: any = {
  posts: '/post/tab',
  recentPosts: '/post/recent',
  post: '/post',
  comments: '/comment',
  tabs: '/tab',
  photos: '/swiper',
  signIn: '/auth/signIn'
};
ROUTES.postsByTabId = (tabId) => ROUTES.posts + `/${tabId}`;
ROUTES.postById = (id) => '/post' + `/${id}`;
ROUTES.commentsByPostId = (postId) => '/comment' + `/${postId}`;

@Injectable()
export class BackendService implements ClientServiceI {

  headers: any;
  routes: any;

  private apiKeyHeader = 'X-Api-Key';
  private apiBasePath = '/api';

  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.routes = ROUTES;
    this.initializeHeaders();
  }

  private initializeHeaders() {
    this.headers = { [this.apiKeyHeader]: API_KEY };
  }

  prepareUrl(uri: string) {
    return this.apiBasePath + uri;
  }

  getAuthorizationHeader(): any {
    return {
      Authorization: this.cookieService.getCookie(this.authService.cookieKey)
    };
  }

}
