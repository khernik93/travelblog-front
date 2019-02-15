import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'singlePost-component',
  styleUrls: ['../postsList/postsList.component.scss', './singlePost.component.scss'],
  templateUrl: './singlePost.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SinglePostComponent {

  @Input() post$: Observable<PostContentDTO>;

}
