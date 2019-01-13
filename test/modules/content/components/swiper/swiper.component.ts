import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { SwiperComponent } from '../../../../../src/modules/content/components/swiper/swiper.component';
import { SwiperService } from '../../../../../src/modules/content/components/swiper/swiper.service';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SetPhotos } from '../../../../../src/modules/content/components/swiper/swiper.actions';
import { ChangeDetectorRef } from '@angular/core';

const photos: Map<string, string[]> = new Map();
photos.set('tab1', ['photo1', 'photo2']);
photos.set('tab2', []);
const fakeState: any = {
  swiper: {
    photos: of(photos)
  },
  menu: {
    selectedTab: of('tab1')
  }
};

describe('SwiperComponent', () => {

  let testStore: any;
  let swiperService: any;
  let changeDetectorRef: any;

  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(() => {

    testStore = {
      select: state => state(fakeState),
      dispatch: jasmine.createSpy()
    };
    swiperService = jasmine.createSpyObj('SwiperService', {
      getPhotos: of(photos)
    });
    changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRed', ['detectChanges']);

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: SwiperService, useValue: swiperService },
        { provide: Store, useValue: testStore },
        { provide: ChangeDetectorRef, useValue: changeDetectorRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  /*
  it('should display all images', () => {
    const imagesCount: number = fixture.debugElement.queryAll(By.css('img')).length;
    expect(imagesCount).toBe(2);
  });
  */

});
