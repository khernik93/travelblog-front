import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { SinglePostStubs } from './helpers/singlePost.stubs';
import { ContentState } from '../../../../../src/modules/content/content.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import singlePostState from './helpers/singlePost.state';
import { GetPost } from '../../../../../src/modules/content/components/singlePost/singlePost.actions';
import singlePostResponse from '../../../../utils/responses/singlePost.response';

describe('SinglePostComponent', () => {

  let store: MockStore<ContentState>;
  let activatedRoute: any;

  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  
  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<ContentState>();
    activatedRoute = SinglePostStubs.getActivatedRoute();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    store.setState(singlePostState);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN getPost action should be dispatched with initial route post id
  `, () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPost(singlePostResponse.id.toString()));
  });

  it(`
    WHEN the component is loaded
    THEN post should be displayed
  `, () => {
    fixture.detectChanges();
    
    // Assure posts count
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(1);
  });

});
