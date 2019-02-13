import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { CommentsState } from './helpers/comments.state';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { MockStore } from '../../../utils/mocks/mockStore';
import { CommentsComponent } from '../../../../src/modules/content/components/comments/comments.component';
import { GetComments, AddComment } from '../../../../src/modules/content/components/comments/store/comments.actions';
import { CommentsService } from '../../../../src/modules/content/components/comments/comments.service';
import { CommentsStubs } from './helpers/comments.stubs';

describe('CommentsComponent', () => {

  let store: MockStore<ContentState>;
  let commentsService: jasmine.SpyObj<CommentsService>;
  
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<ContentState>()
    commentsService = CommentsStubs.getCommentsServiceStub();

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
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(CommentsState));
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
    expect(store.dispatch).toHaveBeenCalledWith(new GetComments(CommentsState.content.singlePost.post.id));
  });

  it(`
    WHEN the component is loaded
    THEN all comments are visible
  `, () => {
    const comments = fixture.debugElement.queryAll(By.css('.comment'));
    expect(comments.length).toEqual(CommentsState.content.comments.comments.length);
  });

  it(`
    WHEN user clicks on the add new comment button
    THEN AddComment action with correct values is dispatched
  `, () => {
    const formValues = {
      name: 'name',
      content: 'content',
      email: 'email'
    };

    component.addNewCommentForm.controls.name.setValue(formValues.name);
    component.addNewCommentForm.controls.content.setValue(formValues.content);
    component.addNewCommentForm.controls.email.setValue(formValues.email);

    const button = fixture.debugElement.query(By.css('.btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(store.dispatch.calls.mostRecent().args).toEqual([new AddComment(formValues)]);
  });

});
