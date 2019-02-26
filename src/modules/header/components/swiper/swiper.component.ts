import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import Swiper from 'swiper';
import { SwiperService } from '../../containers/swiper/swiper.service';
import { Observable } from 'rxjs';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent implements OnChanges {

  @Input() photosForSelectedTab: string[];
  @Input() post$: Observable<PostContentDTO>;

  private swiper: Swiper;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private swiperService: SwiperService
  ) { }

  ngOnChanges() {
    this.reinitializeSwiper();
  }

  /**
   * Initializes swiper for the first time if not yet done, or updates photos
   * on state change:
   * 
   * 1. Remove all existing slides
   * 2. Call update() function on the Swiper object
   */
  private reinitializeSwiper(): void {
    if (this.swiper) {
      this.swiper.removeAllSlides();
    }
    this.changeDetectorRef.detectChanges();
    
    if (! this.swiper) {
      const config = this.swiperService.configuration;
      this.swiper = new Swiper(config.wrapper, config.options);
    } else {
      this.swiper.update();
    }
  }

}
