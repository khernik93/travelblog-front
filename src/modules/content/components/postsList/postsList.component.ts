import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/backend/backend.model';
import { ContentRoutes, contentRoutes } from '../../routing/contentRouting.routes';
import { FadeToggleAnimation } from '../../../../shared/animations';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [FadeToggleAnimation]
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
