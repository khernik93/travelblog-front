import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';
import { ContentRoutes, contentRoutes } from '../../routing/contentRouting.routes';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PostsListComponent {

  @Input() posts$: Observable<PostContentDTO[]>;
  @Input() loading$: Observable<boolean>;
  @Input() selectedTab$: Observable<TabDTO>;
  @Input() initialized$: Observable<boolean>;

  @Output('onScroll') fetchMoreOnScrollEmitter = new EventEmitter<boolean>();
  
  contentRoutes: ContentRoutes = contentRoutes;

  fetchMoreOnScroll() {
    this.fetchMoreOnScrollEmitter.emit(true);
  }

}
