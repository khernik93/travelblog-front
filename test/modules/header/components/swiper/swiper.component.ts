import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import { SwiperComponent } from '../../../../../src/modules/header/components/swiper/swiper.component';
import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { syncReducers, AppState } from '../../../../../src/modules/app/app.reducers';
import { SwiperStubs } from '../../../../utils/stubs/swiperStubs';
import * as MenuActions from '../../../../../src/modules/header/components/menu/menu.actions';
import * as SwiperActions from '../../../../../src/modules/header/components/swiper/swiper.actions';
import tabsResponse from '../../../../utils/responses/tabs';
import photosResponse from '../../../../utils/responses/photos';

describe('SwiperComponent', () => {

  let store: Store<AppState>;
  let swiperService: jasmine.SpyObj<SwiperService>;
  
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(() => {

    swiperService = SwiperStubs.getSwiperService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        StoreModule.forRoot(syncReducers)
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
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN a tab is selected
    THEN its photos should be visible
  `, () => {
    Helper.setSelectedTabAndItsPhotos(tabsResponse[0]);
    fixture.detectChanges();
    Helper.checkImagesCount(2);
  });

  it(`
    WHEN a tab is selected
    AND there are no photos in swiper for that tab
    THEN there are no photos visible at all
  `, () => {
    Helper.setSelectedTabAndItsPhotos(tabsResponse[3]);
    fixture.detectChanges();
    Helper.checkImagesCount(0);
  });

  class Helper {

    static setSelectedTabAndItsPhotos (selectedTab: string) {
      store.dispatch(new MenuActions.SelectTab(selectedTab));
      store.dispatch(new SwiperActions.SetPhotos(photosResponse));
    };
  
    static checkImagesCount (expected: number): void {
      const imagesCount: number = fixture.debugElement.queryAll(By.css('.swiper-wrapper img')).length;
      expect(imagesCount).toBe(expected);
    };

  }

});
