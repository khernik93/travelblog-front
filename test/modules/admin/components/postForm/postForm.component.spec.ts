import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { PostFormComponent } from '../../../../../src/modules/admin/components/postForm/postForm.component';
import { State } from '../../../../utils/state/state';
import { ChangeDetectorRef } from '@angular/core';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('PostFormComponent', () => {

  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: ChangeDetectorRef },
        { provide: ApiClient, useValue: apiClient }    
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    spyOn(component.formSubmitEmitter, 'emit');
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN component is loaded
    THEN all tabs should be available for select
    AND default option is also there
  `, () => {
    component.tabs$ = of(State.header.menu.tabs);
    fixture.detectChanges();
    const tabsOptions = fixture.debugElement.queryAll(By.css('#tabId option'));
    expect(tabsOptions.length).toEqual(State.header.menu.tabs.length + 1);
  });

  it(`
    WHEN component is loaded
    AND should be prefilled
    THEN inputs are prefilled correctly
  `, () => {
    component.post$ = of(State.content.singlePost.post);
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('#title'));
    expect(title.nativeElement.value).toEqual(State.content.singlePost.post.title);
    const tags = fixture.debugElement.query(By.css('#tags'));
    expect(tags.nativeElement.value).toEqual(State.content.singlePost.post.tags.join(','));
    const content = component.content;
    expect(content).toEqual(State.content.singlePost.post.content);
    expect(component.postForm.controls['tabId'].value).toEqual(State.content.singlePost.post.tab.id);
  });

  it(`
    WHEN the form is submitted
    THEN the event is emitted with correct values
  `, () => {
    component.post$ = of(State.content.singlePost.post);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#submit'));
    button.triggerEventHandler('click', null);
    expect(component.formSubmitEmitter.emit).toHaveBeenCalledWith({
      id: State.content.singlePost.post.id,
      tabId: +State.content.singlePost.post.tab.id,
      title: State.content.singlePost.post.title,
      tags: State.content.singlePost.post.tags.join(','),
      content: component.content
    });
  });

  it(`
    WHEN the form is submitted with null values
    THEN the event is emitted with correct values
    AND with no ID
  `, () => {
    const formValues = {
      tabId: '1',
      title: 'title',
      tags: 'tag1,tag2',
      content: 'content'
    };

    fixture.detectChanges();
    component.postForm.controls.tabId.setValue(formValues.tabId);
    component.postForm.controls.title.setValue(formValues.title);
    component.postForm.controls.tags.setValue(formValues.tags);
    component.content = formValues.content;

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#submit'));
    button.triggerEventHandler('click', null);

    expect(component.formSubmitEmitter.emit).toHaveBeenCalledWith({
      tabId: +formValues.tabId,
      title: formValues.title,
      tags: formValues.tags,
      content: formValues.content
    });
  });

});
