import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../../src/modules/content/components/recentPosts/recentPosts.component';
import recentPostsResponse from '../../../../utils/responses/recentPosts';
import { RecentPostsService } from '../../../../../src/modules/content/components/recentPosts/recentPosts.service';
import { RecentPostsStubs } from '../../../../utils/stubs/recentPostsStubs';
import { ContentState } from '../../../../../src/modules/content/content.reducers';
import { APP_MODULE_STORE_AND_EFFECTS } from '../../../../../src/modules/app/app.module';
import { RecentPostsEffects } from '../../../../../src/modules/content/components/recentPosts/recentPosts.effects';

describe('RecentPostsComponent', () => {

  let store: Store<ContentState>;
  let recentPostsService: jasmine.SpyObj<RecentPostsService>;
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;
  
  beforeEach(() => {

    recentPostsService = RecentPostsStubs.getRecentPostsService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        ...APP_MODULE_STORE_AND_EFFECTS,
        EffectsModule.forFeature([RecentPostsEffects])
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: RecentPostsService, useValue: recentPostsService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all recent posts should be displayed properly
  `, () => {
    // Assure posts count
    const postWrapsCount: number = fixture.debugElement.queryAll(By.css('.post-wrap')).length;
    expect(postWrapsCount).toEqual(recentPostsResponse.length);

    // Assure breaking lines count
    const breakingLinesCount: number = fixture.debugElement.queryAll(By.css('.breaking-line')).length;
    expect(breakingLinesCount).toEqual(recentPostsResponse.length - 1);
  });

});
