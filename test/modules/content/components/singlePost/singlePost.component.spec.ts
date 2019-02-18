import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SinglePostComponent } from '../../../../../src/modules/content/components/singlePost/singlePost.component';
import { CommentsContainer } from '../../../../../src/modules/content/containers/comments/comments.container';
import { State } from '../../../../utils/state/state';

describe('SinglePostComponent', () => {

  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ...MODULE_IMPORTS, RouterTestingModule ],
      declarations: MODULE_DECLARATIONS.filter(declaration => declaration !== CommentsContainer),
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    component.post$ = of(State.content.singlePost.post);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN post should be displayed
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(1);
  });

});
