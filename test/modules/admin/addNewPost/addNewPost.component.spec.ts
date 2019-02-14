import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import cloneDeep from 'lodash-es/cloneDeep';

import { HeaderState } from '../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { AddNewPostComponent } from '../../../../src/modules/admin/components/addNewPost/addNewPost.component';
import { AddNewPostState } from './helpers/addNewPost.state';
import { GetTabs } from '../../../../src/modules/header/containers/menu/store/menu.actions';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../src/modules/admin/admin.module';
import { AddNewPost } from '../../../../src/modules/admin/components/addNewPost/store/addNewPost.actions';

describe('AddNewPostComponent', () => {

  let store: MockStore<HeaderState>;

  let component: AddNewPostComponent;
  let fixture: ComponentFixture<AddNewPostComponent>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(AddNewPostState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN the GetTabs action should be dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
  });

  it(`
    WHEN the component is loaded
    THEN all tabs should be loaded and visible
  `, () => {
    const tabs = fixture.debugElement.queryAll(By.css('#tabId option'));
    expect(tabs.length).toEqual(AddNewPostState.header.menu.tabs.length);
  });

  it(`
    WHEN user clicks on the submit button
    THEN addNewPost action with correct values is dispatched
  `, () => {
    const formValues = {
      tabId: AddNewPostState.header.menu.tabs[1].id,
      title: 'title',
      tags: 'tag1',
      content: 'content'
    };

    component.addNewPostForm.controls.tabId.setValue(formValues.tabId);
    component.addNewPostForm.controls.title.setValue(formValues.title);
    component.addNewPostForm.controls.tags.setValue(formValues.tags);
    component.content = formValues.content;

    const button = fixture.debugElement.query(By.css('.btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(store.dispatch.calls.mostRecent().args).toEqual([new AddNewPost({
      ...formValues,
      tabId: +formValues.tabId,
    })]);
  });

});
