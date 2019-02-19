import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { GetPost } from '../../../../../src/modules/content/containers/singlePost/store/singlePost.actions';
import { SinglePostContainer } from '../../../../../src/modules/content/containers/singlePost/singlePost.container';
import { CommentsContainer } from '../../../../../src/modules/content/containers/comments/comments.container';
import { ContentStubs } from '../../../../utils/stubs/content.stubs';
import { State } from '../../../../utils/state/state';

describe('SinglePostContainer', () => {

  let store: MockStore<ContentState>;
  let activatedRoute: any;

  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostContainer>;
  
  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<ContentState>();
    activatedRoute = ContentStubs.activatedRoute();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        RouterTestingModule
      ],
      declarations: MODULE_DECLARATIONS.filter(declaration => declaration !== CommentsContainer),
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(State));
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
    expect(store.dispatch).toHaveBeenCalledWith(new GetPost(ContentStubs.postId));
  });

  it(`
    WHEN the component is loaded
    THEN post should be displayed
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(1);
  });

});
