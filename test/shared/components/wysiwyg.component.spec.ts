import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { WysiwygComponent } from '../../../src/shared/components/wysiwyg/wysiwyg.component';
import { WysiwygService } from '../../../src/shared/components/wysiwyg/wysiwyg.service';
import { SharedStubs } from '../../utils/stubs/sharedStubs';

describe('WysiwygComponent', () => {

  let component: WysiwygComponent;
  let fixture: ComponentFixture<WysiwygComponent>;
  let wysiwygService: jasmine.SpyObj<WysiwygService>;

  beforeEach(() => {
    wysiwygService = SharedStubs.getWysiwygServiceStub();
    TestBed.configureTestingModule({
      imports: [
        NgxEditorModule, 
        FormsModule, 
        HttpClientModule
      ],
      declarations: [WysiwygComponent],
      providers: [
        { provide: WysiwygService, useValue: wysiwygService }
      ]
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
