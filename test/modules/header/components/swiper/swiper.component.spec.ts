import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import { SwiperComponent } from '../../../../../src/modules/header/components/swiper/swiper.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { HeaderState } from '../../../../../src/modules/header/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import swiperState from '../../../../utils/states/swiper';
import photosResponse from '../../../../utils/responses/photos';

describe('SwiperComponent', () => {

  let store: MockStore<HeaderState>;
  
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store },
        { provide: ChangeDetectorRef }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperComponent);
    component = fixture.componentInstance;
    store.setState(swiperState);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN a tab is selected
    THEN its photos should be visible
  `, () => {
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('.swiper-wrapper img'));
    expect(images.length).toBe(2);
  });

});
