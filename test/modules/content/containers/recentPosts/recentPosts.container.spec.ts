import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../../src/modules/content/components/recentPosts/recentPosts.component';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { RecentPostsState } from './helpers/recentPosts.state';
import { RecentPostsContainer } from '../../../../../src/modules/content/containers/recentPosts/recentPosts.container';
import { GetRecentPosts } from '../../../../../src/modules/content/containers/recentPosts/store/recentPosts.actions';

describe('RecentPostsContainer', () => {

  let store: MockStore<ContentState>;
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<ContentState>();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store  }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostsContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(RecentPostsState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN GetRecentPosts action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetRecentPosts());
  });

});
