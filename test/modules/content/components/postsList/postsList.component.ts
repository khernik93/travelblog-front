import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';
import { PostsListComponent } from '../../../../../src/modules/content/components/postsList/postsList.component';
import { PostsListStubs } from '../../../../utils/stubs/postsListStubs';
import { RouterTestingModule } from '@angular/router/testing';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { ContentState } from '../../../../../src/modules/content/content.reducers';
import { HeaderState } from '../../../../../src/modules/header/header.reducers';
import { ROOT_REDUCERS } from '../../../../../src/modules/app/app.module';

describe('PostsListComponent', () => {

  let store: Store<HeaderState | ContentState>;
  let postsListService: jasmine.SpyObj<PostsListService>;
  
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  
  beforeEach(() => {

    postsListService = PostsListStubs.getPostsListService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        ROOT_REDUCERS,
        RouterTestingModule.withRoutes([
          { path: 'posts/:id', component: SinglePostComponent }
        ])
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: PostsListService, useValue: postsListService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  /*

  it(`
    WHEN a new tab is selected
    THEN PostsListService.getPosts function is being called
  `, () => {
    const tabName = 'some-other-tab';
    store.dispatch(new MenuActions.SelectTab(tabName));
    fixture.detectChanges();
    expect(postsListService.getPosts).toHaveBeenCalledWith(tabName);
  });

  it(`
    WHEN the first tab is selected
    THEN all relevant posts should be properly displayed
  `, () => {
    store.dispatch(new MenuActions.SelectTab(tabsResponse[0]));
    fixture.detectChanges();
    
    // Assure posts count
    const postWrapsCount: number = fixture.debugElement.queryAll(By.css('.post-wrap')).length;
    expect(postWrapsCount).toEqual(postsListResponse.content.length);

    // Assure breaking lines count
    const breakingLinesCount: number = fixture.debugElement.queryAll(By.css('.breaking-line')).length;
    expect(breakingLinesCount).toEqual(postsListResponse.content.length - 1);
  });

  */

  /* @TODO Check if read more redirects correctly */

});
