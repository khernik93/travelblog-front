import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

import { SwiperComponent } from '../../../../../src/modules/header/components/swiper/swiper.component';
import { MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { State } from '../../../../utils/state/state';

describe('SwiperComponent', () => {
  

  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: [SwiperComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ChangeDetectorRef }
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
    THEN its photo is visible (just one because swiper was removed)
  `, () => {
    const photos = State.header.swiper.photos[1];
    component.photosForSelectedTab = photos;
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('.swiper-wrapper img'));
    expect(images.length).toBe(1);
  });

});
