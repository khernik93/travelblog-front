import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';
import { SwiperService } from '../../containers/swiper/swiper.service';

@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent {

  @Input() photosForSelectedTab: string[];
  @Input() post$: Observable<PostContentDTO>;
  config = this.swiperService.CONFIGURATION;

  constructor(
    private swiperService: SwiperService
  ) { }

}
