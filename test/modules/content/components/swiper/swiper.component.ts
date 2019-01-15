import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import { SwiperComponent } from '../../../../../src/modules/content/components/swiper/swiper.component';
import { SwiperService } from '../../../../../src/modules/content/components/swiper/swiper.service';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { MockStoreModule, MockAction } from '../../../../utils/mock-store';

const tabs: string[] = ['tab1', 'tab2', 'tab3'];
const photos: any = {
  [tabs[0]]: ['photo1', 'photo2'],
  [tabs[1]]: ['photo3']
};
const fakeState: any = {
  swiper: {
    photos: photos
  },
  menu: {
    selectedTab: tabs[0]
  }
};

const imagesPath = '.swiper-wrapper img';

describe('SwiperComponent', () => {

  let store: any;
  let swiperService: jasmine.SpyObj<SwiperService>;
  
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;
  
  const checkImagesCount = (expected: number): void => {
    fixture.detectChanges();
    const imagesCount: number = fixture.debugElement.queryAll(By.css(imagesPath)).length;
    expect(imagesCount).toBe(expected);
  };

  beforeEach(() => {

    swiperService = jasmine.createSpyObj('SwiperService', {
      getPhotos: of(photos)
    });

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        MockStoreModule.forRoot('swiper', fakeState.swiper),
        MockStoreModule.forRoot('menu', fakeState.menu)
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: SwiperService, useValue: swiperService },
        { provide: ChangeDetectorRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it('should display all images', () => {
    checkImagesCount(2);
  });

  it('should change photos on selecting another tab', async(() => {
    store.dispatch(new MockAction({selectedTab: tabs[1]}));
    checkImagesCount(1);
  }));

  it('should not show photos if the tab doesnt have them', async(() => {
    store.dispatch(new MockAction({selectedTab: tabs[2]}));
    checkImagesCount(0);
  }));

});
