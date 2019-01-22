import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

import { SwiperComponent } from '../../../../src/modules/header/components/swiper/swiper.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/header/header.module';
import { HeaderState } from '../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SwiperState } from '../swiper/helpers/swiper.state';

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
    store.setState(_.cloneDeep(SwiperState));
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
    const images = fixture.debugElement.queryAll(By.css('.swiper-wrapper img'));
    expect(images.length).toBe(2);
  });

});
