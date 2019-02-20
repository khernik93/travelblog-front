import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { WysiwygComponent } from '../../../src/shared/components/wysiwyg/wysiwyg.component';

describe('WysiwygComponent', () => {

  let component: WysiwygComponent;
  let fixture: ComponentFixture<WysiwygComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QuillModule, 
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
