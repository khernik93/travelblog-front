import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SwiperContainer } from '../../../../../src/modules/header/containers/swiper/swiper.container';
import { State } from '../../../../utils/state/state';

describe('SwiperContainer', () => {

  let store: MockStore<HeaderState>;
  
  let component: SwiperContainer;
  let fixture: ComponentFixture<SwiperContainer>;

  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: [SwiperContainer],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: ChangeDetectorRef }
      ],

    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(State));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
