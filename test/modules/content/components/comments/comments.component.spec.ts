import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { CommentsComponent } from '../../../../../src/modules/content/components/comments/comments.component';
import { State } from '../../../../utils/state/state';

describe('CommentsComponent', () => {
  
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    spyOn(component.addNewCommentEmitter, 'emit');
    component.comments$ = of(State.content.comments.comments);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all comments are visible
  `, () => {
    const comments = fixture.debugElement.queryAll(By.css('.comment'));
    expect(comments.length).toEqual(State.content.comments.comments.length);
  });

  it(`
    WHEN user clicks on the add new comment button
    THEN event is emitted with correct values
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
    expect(component.addNewCommentEmitter.emit).toHaveBeenCalledWith(formValues);
  });

});
