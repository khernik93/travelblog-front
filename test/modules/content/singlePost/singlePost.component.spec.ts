import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { SinglePostComponent } from '../../../../src/modules/content/components/singlePost/singlePost.component';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SinglePostState } from './helpers/singlePost.state';
import { SinglePostStubs } from './helpers/singlePost.stubs';
import { GetPost } from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { CommentsComponent } from '../../../../src/modules/content/components/comments/comments.component';

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
      declarations: MODULE_DECLARATIONS.filter(component => (
        component !== CommentsComponent
      )),
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(SinglePostState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN GetPost action should be dispatched with initial route post id
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPost(SinglePostStubs.postId));
  });

  it(`
    WHEN the component is loaded
    THEN post should be displayed
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(1);
  });

});
