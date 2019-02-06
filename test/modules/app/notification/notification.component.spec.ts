import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/app/app.module';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { AppState } from '../../../../src/modules/app/store/app.reducers';
import { NotificationComponent } from '../../../../src/modules/app/components/notification/notification.component';
import { NotificationState } from './helpers/notification.state';

describe('NotificationComponent', () => {

  let store: MockStore<AppState>;

  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<AppState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(NotificationState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
