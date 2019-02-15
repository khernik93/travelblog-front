import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChangeDetectorRef } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

import { SwiperComponent } from '../../../../../src/modules/header/components/swiper/swiper.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SwiperState } from './helpers/swiper.state';
import { SwiperService } from '../../../../../src/modules/header/containers/swiper/swiper.service';
import { SwiperStubs } from './helpers/swiper.stubs';
import { SwiperContainer } from '../../../../../src/modules/header/containers/swiper/swiper.container';

describe('SwiperContainer', () => {

  let store: MockStore<HeaderState>;
  let swiperService: jasmine.SpyObj<SwiperService>;
  
  let component: SwiperContainer;
  let fixture: ComponentFixture<SwiperContainer>;

  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<HeaderState>();
    swiperService = SwiperStubs.getSwiperServiceStub();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store },
        { provide: ChangeDetectorRef },
        { provide: SwiperService, useValue: swiperService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(SwiperState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
