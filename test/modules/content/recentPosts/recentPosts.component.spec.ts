import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../src/modules/content/components/recentPosts/recentPosts.component';
import recentPostsResponse from '../../../utils/responses/recentPosts.response';
import { ContentState } from '../../../../src/modules/content/content.reducers';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import recentPostsState from './helpers/recentPosts.state';

describe('RecentPostsComponent', () => {

  let store: MockStore<ContentState>;
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;
  
  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<ContentState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store  }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
    store.setState(recentPostsState);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all recent posts should be displayed properly
  `, () => {
    fixture.detectChanges();

    // Assure posts count
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(recentPostsResponse.length);

    // Assure breaking lines count
    const breakingLines = fixture.debugElement.queryAll(By.css('.breaking-line'));
    expect(breakingLines.length).toEqual(recentPostsResponse.length - 1);
  });

});
