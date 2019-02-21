import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';
import { FadeToggleAnimation } from '../../../../shared/animations';

@Component({
  selector: 'singlePost-component',
  styleUrls: ['./singlePost.component.scss', '../postsList/postsList.component.scss'],
  templateUrl: './singlePost.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [FadeToggleAnimation]
})
export class SinglePostComponent {

  @Input() post$: Observable<PostContentDTO>;

}
