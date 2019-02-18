import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../../src/modules/content/components/recentPosts/recentPosts.component';
import { State } from '../../../../utils/state/state';

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
    component.recentPosts$ = of(State.content.recentPosts.recentPosts);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all recent posts should be displayed properly
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(State.content.recentPosts.recentPosts.length);
  });

});
