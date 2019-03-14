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
export class SwiperComponent implements OnChanges {

  @Input() photosForSelectedTab: string[];
  @Input() post$: Observable<PostContentDTO>;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  config = this.swiperService.CONFIGURATION;

  constructor(
    private swiperService: SwiperService
  ) { }

  ngOnChanges() {	
    this.reinitializeSwiper();	
  }

  /**	
   * Initializes swiper for the first time if not yet done, or updates photos	
   * on state change:	
   * 	
   * call update() function on the Swiper object	
   */	
  private reinitializeSwiper(): void {	
    this.directiveRef.update();
  }

}
