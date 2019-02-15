import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../../src/modules/content/components/recentPosts/recentPosts.component';
import { RecentPostsState } from './../../containers/recentPosts/helpers/recentPosts.state';
import { of } from 'rxjs';

describe('RecentPostsComponent', () => {
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ...MODULE_IMPORTS, RouterTestingModule ],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.recentPosts$ = of(RecentPostsState.content.recentPosts.recentPosts);
    fixture.detectChanges();
  })

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all recent posts should be displayed properly
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(RecentPostsState.content.recentPosts.recentPosts.length);
  });

});
