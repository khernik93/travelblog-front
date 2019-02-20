import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { TransferHttpService } from '../../services/transferHttp.service';
import { AuthCredentials } from '../../../modules/auth/auth.model';
import {
  PostContentDTO, PostsDTO, SwiperDTO, TabDTO, CommentDTO
} from './api.model';
import { CookieService } from '../../services/cookie.service';
import { Comment } from '../../../modules/content/containers/comments/comments.model';

const ROUTES: any = {
  posts: '/post/tab',
  recentPosts: '/post/recent',
  post: '/post',
  comments: '/comment',
  tabs: '/tab',
  photos: '/swiper',
  addNewPost: '/post',
  updatePost: '/post',
  deletePost: '/post',
  signIn: '/auth/signIn',
  uploadPhoto: '/system/uploadPhoto'
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

  getRecentPosts(): Observable<PostContentDTO[]> {
    const url = this.prepareUrl(ROUTES.recentPosts);
    return this.transferHttpService.get(url, {
      headers: this.headers
    })
    .pipe(
      map((response: any) => response.postContents)
    );
  }

  getPosts(tabId: number, params: {start: number, end: number}): Observable<PostsDTO> {
    const url = this.prepareUrl(ROUTES.posts);
    return this.transferHttpService.get(`${url}/${tabId}`, {
      params: { 
        start: params.start.toString(),
        end: params.end.toString() 
      }, 
      headers: this.headers
    });
  }

  getPost(id: string): Observable<PostContentDTO> {
    const url = this.prepareUrl(ROUTES.post);
    return this.transferHttpService.get(`${url}/${id}`, {
      headers: this.headers
    });
  }

  getComments(postId: string): Observable<CommentDTO[]> {
    const url = this.prepareUrl(ROUTES.comments);
    return this.transferHttpService.get(`${url}/${postId}`, {
      headers: this.headers
    })
      .pipe(
        map((response: any) => response.comments)
      );
  }

  getTabs(): Observable<TabDTO[]> {
    const url = this.prepareUrl(ROUTES.tabs);
    return this.transferHttpService.get(url, {
      headers: this.headers
    })
      .pipe(
        map((response: any) => response.tabs)
      );
  }

  addComment(comment: Comment, postId: number): Observable<CommentDTO> {
    const url = this.prepareUrl(ROUTES.comments);
    return this.transferHttpService.post(`${url}/${postId}`, comment, {
      headers: this.headers
    });
  }

  getPhotos(): Observable<SwiperDTO> {
    const url = this.prepareUrl(ROUTES.photos);
    return this.transferHttpService.get(url, {
      headers: this.headers
    })
      .pipe(
        map((response: any) => response.tabPhotos)
      );
  }

  addNewPost(post: PostContentDTO): Observable<void> {
    const url = this.prepareUrl(ROUTES.addNewPost);
    const headers = this.headers
      .append('Authorization', this.cookieService.getCookie('SESSION_ID'));
    return this.transferHttpService.post(url, post, {
      headers: headers
    });
  }

  updatePost(post: PostContentDTO): Observable<void> {
    const url = this.prepareUrl(ROUTES.updatePost);
    const headers = this.headers
      .append('Authorization', this.cookieService.getCookie('SESSION_ID'));
    return this.transferHttpService.put(url, post, {
      headers: headers
    });
  }

  deletePost(postId: number): Observable<void> {
    const url = this.prepareUrl(ROUTES.deletePost);
    const headers = this.headers
      .append('Authorization', this.cookieService.getCookie('SESSION_ID'));
    return this.transferHttpService.delete(`${url}/${postId}`, {
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

  uploadFile(file: any): Observable<String> {
    const url = this.prepareUrl(ROUTES.uploadPhoto);
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Accept', 'application/json');
    return this.transferHttpService.post(url, formData, {
      headers: this.headers,
      responseType: 'text'
    });
  }

  /**
   * Build absolute URL based on a path
   * @param uri 
   */
  private prepareUrl(uri: string) {
    return '/api' + uri;
  }

}
