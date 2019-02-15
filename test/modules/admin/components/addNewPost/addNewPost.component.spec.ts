import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import cloneDeep from 'lodash-es/cloneDeep';
import { of } from 'rxjs';

import { AddNewPostComponent } from '../../../../../src/modules/admin/components/addNewPost/addNewPost.component';
import { AddNewPostState } from '../../containers/addNewPost/helpers/addNewPost.state';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';

describe('AddNewPostComponent', () => {

  let component: AddNewPostComponent;
  let fixture: ComponentFixture<AddNewPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.tabs$ = of(cloneDeep(AddNewPostState).header.menu.tabs);
    spyOn(component.formSubmitEmitter, 'emit');
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all tabs with default choice are visible
  `, () => {
    const tabs = fixture.debugElement.queryAll(By.css('#tabId option'));
    expect(tabs.length).toEqual(AddNewPostState.header.menu.tabs.length + 1);
  });

  it(`
    WHEN user clicks on the submit button
    THEN event is emitted with correct values from form
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
    expect(component.formSubmitEmitter.emit).toHaveBeenCalledTimes(1);
    expect(component.formSubmitEmitter.emit).toHaveBeenCalledWith({
      ...formValues,
      tabId: +formValues.tabId,
    });
  });

});
