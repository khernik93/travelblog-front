import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';
import { ContentRoutes, contentRoutes } from '../../routing/contentRouting.routes';

@Component({
  selector: 'recentPosts-component',
  styleUrls: ['../postsList/postsList.component.scss', './recentPosts.component.scss'],
  templateUrl: './recentPosts.component.html'
})
export class RecentPostsComponent {

  @Input() recentPosts$: Observable<PostContentDTO[]>;

  contentRoutes: ContentRoutes = contentRoutes;

}
