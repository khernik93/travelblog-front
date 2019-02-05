import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http'; 

import { WysiwygComponent } from '../../../src/shared/components/wysiwyg/wysiwyg.component';
import { FormsModule } from '@angular/forms';

describe('WysiwygComponent', () => {

  let component: WysiwygComponent;
  let fixture: ComponentFixture<WysiwygComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxEditorModule, 
        FormsModule, 
        HttpClientModule
      ],
      declarations: [WysiwygComponent],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
