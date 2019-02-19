import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { AdminHeaderComponent } from '../../../../../src/modules/admin/components/adminHeader/adminHeader.component';

describe('AdminHeaderComponent', () => {

  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ...MODULE_IMPORTS, RouterTestingModule ],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    spyOn(component.signOutEmitter, 'emit');
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN logout button is clicked
    THEN signOut event is emitted
  `, () => {
    const button = fixture.debugElement.query(By.css('.logout-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signOutEmitter.emit).toHaveBeenCalledTimes(1);
  });

});
