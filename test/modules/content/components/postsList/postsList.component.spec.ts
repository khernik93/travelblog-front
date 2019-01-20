import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { PostsListComponent } from '../../../../../src/modules/content/components/postsList/postsList.component';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { HeaderState } from '../../../../../src/modules/header/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../../src/modules/content/content.reducers';
import postsListState, { INITIALLY_SELECTED_TAB } from '../../../../utils/states/postsList';
import { GetPosts } from '../../../../../src/modules/content/components/postsList/postsList.actions';
import postsListResponse from '../../../../utils/responses/postsList';
import { MockStore } from '../../../../utils/mocks/mockStore';

const TEST_ROUTES = [
  { path: 'posts/:id', component: SinglePostComponent }
];

describe('PostsListComponent', () => {

  let store: MockStore<HeaderState | ContentState>;
  
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  
  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<HeaderState | ContentState>();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule.withRoutes(TEST_ROUTES)
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    store.setState(postsListState);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN getPosts action should be dispatched with initially selected tab
  `, () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPosts(INITIALLY_SELECTED_TAB));
  });

  it(`
    WHEN the component is loaded
    THEN posts should be displayed
  `, () => {
    fixture.detectChanges();
    
    // Assure posts count
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(postsListResponse.content.length);

    // Assure breaking lines count
    const breakingLines = fixture.debugElement.queryAll(By.css('.breaking-line'));
    expect(breakingLines.length).toEqual(postsListResponse.content.length - 1);
  });

});
