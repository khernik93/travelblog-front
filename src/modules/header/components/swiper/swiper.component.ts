import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent {

  @Input() photosForSelectedTab: string[];
  @Input() post$: Observable<PostContentDTO>;

}
