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
  
  const posts = State.content.postsList.posts;
  const selectedTab = State.header.menu.selectedTab;

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
    component.selectedTab$ = of(selectedTab);
    component.posts$ = of(posts);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN component is loaded
    THEN selected tab from store is being selected
  `, () => {
    expect(component.tabsForm.controls['tabId'].value).toEqual(selectedTab.id.toString());
  });

  it(`
    WHEN component is loaded
    THEN all posts are visible
  `, () => {
    const posts = fixture.debugElement.queryAll(By.css('.post-row'))
    expect(posts.length).toEqual(State.content.postsList.posts.length);
  });

  it(`
    WHEN tabsForm changes
    THEN onTabChangesEmiter emits updated tab value
  `, () => {
    spyOn(component.onTabChangesEmitter, 'emit');

    // Should be called on change
    component.tabsForm.controls['tabId'].patchValue(State.header.menu.tabs[1]);
    fixture.detectChanges();
    expect(component.onTabChangesEmitter.emit).toHaveBeenCalledTimes(1);

    // Shouldn't be called because of the distinct filter
    component.tabsForm.controls['tabId'].patchValue(State.header.menu.tabs[1]);
    fixture.detectChanges();
    expect(component.onTabChangesEmitter.emit).toHaveBeenCalledTimes(1);

    // Should be called again if the tab changes
    component.tabsForm.controls['tabId'].patchValue(State.header.menu.tabs[2]);
    fixture.detectChanges();
    expect(component.onTabChangesEmitter.emit).toHaveBeenCalledTimes(2);
  });

  it(`
    WHEN delete link is clicked of some post
    THEN delete event is emitted with correct post ID
  `, () => {
    spyOn(component.onDeletePostEmitter, 'emit');
    fixture.detectChanges();
    
    const deleteButtons = fixture.debugElement.queryAll(By.css('.btn-delete'));
    const chosenPostIndex = 0;
    deleteButtons[chosenPostIndex].nativeElement.click();
    fixture.detectChanges();

    expect(component.onDeletePostEmitter.emit).toHaveBeenCalledTimes(1);
    expect(component.onDeletePostEmitter.emit).toHaveBeenCalledWith(posts[chosenPostIndex].id);
  });

});
