import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';
import { of } from 'rxjs';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { PostsListComponent } from '../../../../../src/modules/content/components/postsList/postsList.component';
import { PostsListState } from '../../containers/postsList/helpers/postsList.state';

describe('PostsListComponent', () => {
  
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let ClonedPostsListState: typeof PostsListState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() =>{
    ClonedPostsListState = cloneDeep(PostsListState);
  });

  beforeEach(() => {
    component.posts$ = of(ClonedPostsListState.content.postsList.posts);
    component.selectedTab$ = of(ClonedPostsListState.header.menu.selectedTab);
    fixture.detectChanges();
  })

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN posts should be displayed
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(ClonedPostsListState.content.postsList.posts.length);
  });

  it(`
    WHEN there are no posts
    THEN the proper text is displayed
  `, () => {
    component.posts$ = of([]);
    component.initialized$ = of(true);
    fixture.detectChanges();
    const noContent = fixture.debugElement.queryAll(By.css('.no-content'));
    expect(noContent.length).toEqual(1);
  });

});
