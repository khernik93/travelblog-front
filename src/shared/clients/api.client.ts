import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { TransferHttpService } from '../services/transferHttp.service';
import { AuthCredentials } from '../../modules/auth/auth.model';
import { environment } from '../../environments/environment';
import { 
  PostsPaginable, 
  Tab, 
  Photos,
  Post,
  ApiResponse
} from './api.model';

const ROUTES: any = {
  posts: '/post/tab',
  recentPosts: '/recentpost',
  post: '/post',
  tabs: '/tab',
  photos: '/swiperphoto',
  addNewPost: '/addNewPost',
  signIn: '/signin'
};

@Injectable()
export class ApiClient {

  constructor(
    private transferHttpService: TransferHttpService
  ) { }

  getRecentPosts(): Observable<ApiResponse<Post[]>> {
    const url = this.prepareUrl(ROUTES.recentPosts);
    return this.transferHttpService.get(url);
  }

  getPosts(tabId: number, params: {start: number, end: number}): Observable<ApiResponse<PostsPaginable>> {
    const url = this.prepareUrl(ROUTES.posts);
    return this.transferHttpService.get(`${url}/${tabId}`, {params: { 
      start: params.start.toString(),
      end: params.end.toString() 
    }});
  }

  getPost(id: string): Observable<ApiResponse<Post>> {
    const url = this.prepareUrl(ROUTES.post);
    return this.transferHttpService.get(`${url}/${id}`);
  }

  getTabs(): Observable<ApiResponse<Tab[]>> {
    const url = this.prepareUrl(ROUTES.tabs);
    return this.transferHttpService.get(url);
  }

  getPhotos(): Observable<ApiResponse<Photos>> {
    const url = this.prepareUrl(ROUTES.photos);
    return this.transferHttpService.get(url);
  }

  addNewPost(post: Post, tab: Tab): Observable<ApiResponse<void>> {
    const url = this.prepareUrl(ROUTES.addNewPost);
    return this.transferHttpService.post(url, { ...post, tab });
  }

  signIn(credentials: AuthCredentials): Observable<ApiResponse<void>> {
    const url = this.prepareUrl(ROUTES.signIn);
    return this.transferHttpService.post(url, {credentials}, {
      withCredentials: true
    });
  }

  /**
   * Build absolute URL based on a path
   * @param uri 
   */
  private prepareUrl(uri: string) {
    return environment.baseUrl + uri;
  }

}
