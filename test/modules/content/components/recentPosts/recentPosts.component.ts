import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { RecentPostsComponent } from '../../../../../src/modules/content/components/recentPosts/recentPosts.component';
import { syncReducers, AppState } from '../../../../../src/modules/app/app.reducers';
import recentPostsResponse from '../../../../utils/responses/recentPosts';
import { RecentPostsService } from '../../../../../src/modules/content/components/recentPosts/recentPosts.service';
import { RecentPostsStubs } from '../../../../utils/stubs/recentPostsStubs';

describe('RecentPostsComponent', () => {

  let store: Store<AppState>;
  let recentPostsService: jasmine.SpyObj<RecentPostsService>;
  
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;
  
  beforeEach(() => {

    recentPostsService = RecentPostsStubs.getRecentPostsService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        StoreModule.forRoot(syncReducers)
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
