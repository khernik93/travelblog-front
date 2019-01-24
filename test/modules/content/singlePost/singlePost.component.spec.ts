import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { SinglePostComponent } from '../../../../src/modules/content/components/singlePost/singlePost.component';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SinglePostState } from './helpers/singlePost.state';
import { GetPost } from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { SinglePostResponse } from '../../../utils/responses/singlePost.response';
import { SinglePostStubs } from './helpers/singlePost.stubs';

describe('SinglePostComponent', () => {

  let store: MockStore<ContentState>;
  let activatedRoute: any;

  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  let ClonedSinglePostResponse: typeof SinglePostResponse;
  
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
    store.setState(cloneDeep(SinglePostState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  beforeEach(() => {
    ClonedSinglePostResponse = cloneDeep(SinglePostResponse);
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN getPost action should be dispatched with initial route post id
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPost(ClonedSinglePostResponse.id.toString()));
  });

  it(`
    WHEN the component is loaded
    THEN post should be displayed
  `, () => {
    // Assure posts count
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(1);
  });

});
