import { Injectable } from '@angular/core';	
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';	
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';

@Injectable()	
export class SwiperService {	

   /**	
   * Configuration object for initializing swiper element	
   */	
  public CONFIGURATION: SwiperConfigInterface = {
    slidesPerView: 1,	
    spaceBetween: 0,	
    loop: true,	
    speed: 300,	
    preloadImages: false,
    lazy: true,
    observer: true,
    pagination: {
      el: `.swiper-pagination`	
    },	
    navigation: {	
      nextEl: `.swiper-button-next`,	
      prevEl: `.swiper-button-prev`	
    }
  };	

 }
