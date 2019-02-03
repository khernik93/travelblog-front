import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../src/modules/content/components/recentPosts/recentPosts.component';
import { RecentPostsResponse } from '../../../utils/responses/recentPosts.response';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { RecentPostsState } from './helpers/recentPosts.state';

describe('RecentPostsComponent', () => {

  let store: MockStore<ContentState>;
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;
  let ClonedRecentPostsResponse: typeof RecentPostsResponse;

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
    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(RecentPostsState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  beforeEach(() => {
    ClonedRecentPostsResponse = cloneDeep(RecentPostsResponse);
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all recent posts should be displayed properly
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(ClonedRecentPostsResponse.length);
  });

});
