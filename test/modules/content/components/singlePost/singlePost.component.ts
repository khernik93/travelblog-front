import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SinglePostService } from '../../../../../src/modules/content/components/singlePost/singlePost.service';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { SinglePostStubs } from '../../../../utils/stubs/singlePostStubs';
import { ContentState } from '../../../../../src/modules/content/content.reducers';
import { APP_MODULE_STORE_AND_EFFECTS } from '../../../../../src/modules/app/app.module';
import { SinglePostEffects } from '../../../../../src/modules/content/components/singlePost/singlePost.effects';

describe('SinglePostComponent', () => {

  let store: Store<ContentState>;
  let activatedRoute: any;
  let singlePostService: jasmine.SpyObj<SinglePostService>;

  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  
  beforeEach(() => {

    activatedRoute = SinglePostStubs.getActivatedRoute();
    singlePostService = SinglePostStubs.getSinglePostService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule,
        ...APP_MODULE_STORE_AND_EFFECTS,
        EffectsModule.forFeature([SinglePostEffects])
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: SinglePostService, useValue: singlePostService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
