import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthCredentials } from '../../../modules/auth/auth.model';
import { PostContentDTO, PostsDTO, SwiperDTO, TabDTO, CommentDTO } from './backend.model';
import { Comment } from '../../../modules/content/containers/comments/comments.model';
import { Client } from '../client';
import { BackendService } from './backend.service';
import { TransferHttpService } from '../../services/transferHttp.service';

@Injectable()
export class BackendClient {

  private client: Client;

  constructor(
    private backendService: BackendService,
    private transferHttpService: TransferHttpService
  ) {
    this.client = new Client(
      this.backendService,
      this.transferHttpService
    );
  }

  getRecentPosts(): Observable<PostContentDTO[]> {
    return this.client.sendGetRequest({
      uri: this.client.routes.recentPosts
    })
      .pipe(map((response: any) => response.postContents));
  }

  getPosts(tabId: number, params: {start: String, end: String}): Observable<PostsDTO> {
    return this.client.sendGetRequest({
      uri: this.client.routes.postsByTabId(tabId), 
      params
    });
  }

  getPost(id: string): Observable<PostContentDTO> {
    return this.client.sendGetRequest({
      uri: this.client.routes.postById(id)
    });
  }

  getComments(postId: string): Observable<CommentDTO[]> {
    return this.client.sendGetRequest({
      uri: this.client.routes.commentsByPostId(postId)
    })
      .pipe(map((response: any) => response.comments));
  }

  getTabs(): Observable<TabDTO[]> {
    return this.client.sendGetRequest({
      uri: this.client.routes.tabs
    })
      .pipe(map((response: any) => response.tabs));
  }

  addComment(comment: Comment, postId: number): Observable<CommentDTO> {
    return this.client.sendPostRequest({
      uri: this.client.routes.commentsByPostId(postId), 
      payload: comment
    });
  }

  getPhotos(): Observable<SwiperDTO> {
    return this.client.sendGetRequest({
      uri: this.client.routes.photos
    })
      .pipe(map((response: any) => response.tabPhotos));
  }

  addNewPost(post: PostContentDTO): Observable<void> {
    return this.client.sendPostRequest({
      uri: this.client.routes.post, 
      payload: post,
      secured: true
    });
  }

  updatePost(post: PostContentDTO): Observable<void> {
    return this.client.sendPutRequest({
      uri: this.client.routes.post, 
      payload: post,
      secured: true
    });
  }

  deletePost(postId: number): Observable<void> {
    return this.client.sendDeleteRequest({
      uri: this.client.routes.postById(postId),
      secured: true
    });
  }

  signIn(credentials: AuthCredentials): Observable<void> {
    return this.client.sendPostRequest({
      uri: this.client.routes.signIn,
      payload: credentials,
      params: {
        headers: {
          withCredentials: true
        }
      }
    });
  }

}
