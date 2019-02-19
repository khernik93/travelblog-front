import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoComponent } from '../../../../../src/modules/header/components/logo/logo.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';

describe('LogoComponent', () => {

  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
