import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { State } from '../../../../utils/state/state';
import { WysiwygService } from '../../../../../src/shared/components/wysiwyg/wysiwyg.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { PostsTableComponent } from '../../../../../src/modules/admin/components/postsTable/postsTable.component';

describe('PostsTableComponent', () => {

  let component: PostsTableComponent;
  let fixture: ComponentFixture<PostsTableComponent>;
  let wysiwygService: jasmine.SpyObj<WysiwygService>;

  beforeEach(() => {
    wysiwygService = SharedStubs.getWysiwygServiceStub();
    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: WysiwygService, useValue: wysiwygService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsTableComponent);
    component = fixture.componentInstance;
    component.selectedTab$ = of(State.header.menu.selectedTab);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN component is loaded
    THEN selected tab from store is being selected
  `, () => {
    expect(component.tabsForm.controls['tabId'].value).toEqual(State.header.menu.selectedTab.id.toString());
  });

  it(`
    WHEN component is loaded
    THEN all posts are visible
  `, () => {
    component.posts$ = of(State.content.postsList.posts);
    fixture.detectChanges();
    const posts = fixture.debugElement.queryAll(By.css('.post-row'))
    expect(posts.length).toEqual(State.content.postsList.posts.length);
  });

});
