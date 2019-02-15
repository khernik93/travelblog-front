import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SwiperComponent } from '../../../../../src/modules/header/components/swiper/swiper.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { SwiperService } from '../../../../../src/modules/header/containers/swiper/swiper.service';
import { ChangeDetectorRef } from '@angular/core';
import { SwiperStubs } from '../../containers/swiper/helpers/swiper.stubs';
import { SwiperState } from '../../containers/swiper/helpers/swiper.state';

describe('SwiperComponent', () => {
  
  let swiperService: jasmine.SpyObj<SwiperService>;

  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(() => {

    swiperService = SwiperStubs.getSwiperServiceStub();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: ChangeDetectorRef },
        { provide: SwiperService, useValue: swiperService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperComponent);
    component = fixture.componentInstance;
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN a tab is selected
    THEN its photos should be visible
  `, () => {
    const photos = SwiperState.header.swiper.photos[1];
    component.photosForSelectedTab = photos;
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('.swiper-wrapper img'));
    expect(images.length).toBe(photos.length);
  });

});
