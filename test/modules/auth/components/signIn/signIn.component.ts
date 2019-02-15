import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/auth/auth.module';
import { SignInComponent } from '../../../../../src/modules/auth/components/signIn/signIn.component';

describe('SignInComponent', () => {
  
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
