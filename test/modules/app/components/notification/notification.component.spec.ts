import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/app/app.module';
import { NotificationComponent } from '../../../../../src/modules/app/components/notification/notification.component';

describe('NotificationComponent', () => {

  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

});
