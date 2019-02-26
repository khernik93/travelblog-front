import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { GetComments } from '../../../../../src/modules/content/containers/comments/store/comments.actions';
import { CommentsService } from '../../../../../src/modules/content/containers/comments/comments.service';
import { CommentsContainer } from '../../../../../src/modules/content/containers/comments/comments.container';
import { ContentStubs } from '../../../../utils/stubs/content.stubs';
import { State } from '../../../../utils/state/state';

describe('CommentsContainer', () => {

  let store: MockStore<ContentState>;
  let commentsService: jasmine.SpyObj<CommentsService>;
  
  let component: CommentsContainer;
  let fixture: ComponentFixture<CommentsContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<ContentState>();
    commentsService = ContentStubs.commentsService();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store },
        { provide: CommentsService, useValue: commentsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsContainer);
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
    THEN GetComments is disptached with current post ID
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetComments(State.content.singlePost.post.id));
  });

});
