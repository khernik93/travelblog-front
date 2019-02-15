import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/app/app.module';
import { LayoutComponent } from '../../../../../src/modules/app/components/layout/layout.component';
import { LayoutContainer } from '../../../../../src/modules/app/containers/layout/layout.container';

describe('LayoutComponent', () => {
  
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: [...MODULE_DECLARATIONS, LayoutComponent, LayoutContainer],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
