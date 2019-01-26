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
  ApiResponse,
  NewPost
} from './api.model';

const ROUTES: any = {
  posts: '/posts',
  recentPosts: '/recentPosts',
  post: '/post',
  tabs: '/countries',
  photos: '/swiperphotos',
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

  getPosts(tab: string): Observable<ApiResponse<PostsPaginable>> {
    const url = this.prepareUrl(ROUTES.posts);
    return this.transferHttpService.get(url, {params: {tab}});
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

  addNewPost(newPost: NewPost): Observable<ApiResponse<void>> {
    const url = this.prepareUrl(ROUTES.addNewPost);
    return this.transferHttpService.post(url, {newPost});
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
