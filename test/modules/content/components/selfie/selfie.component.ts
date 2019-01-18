import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { SelfieComponent } from '../../../../../src/modules/content/components/selfie/selfie.component';

describe('SelfieComponent', () => {
  
  let component: SelfieComponent;
  let fixture: ComponentFixture<SelfieComponent>;
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieComponent);
    component = fixture.componentInstance;
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
