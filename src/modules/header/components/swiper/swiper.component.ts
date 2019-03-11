import { Component, Input, ChangeDetectorRef, OnChanges, ViewChild } from '@angular/core';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { SwiperService } from '../../containers/swiper/swiper.service';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'swiper-component',
  styleUrls: ['./swiper.component.scss'],
  templateUrl: './swiper.component.html'
})
export class SwiperComponent implements OnChanges {

  @Input() photosForSelectedTab: string[];
  @Input() post$: Observable<PostContentDTO>;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  config = this.swiperService.configuration;

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
    this.directiveRef.update();
    this.changeDetectorRef.detectChanges();
  }

}
