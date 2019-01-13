import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { MenuComponent } from '../../../../../src/modules/header/components/menu/menu.component';
import { MenuService } from '../../../../../src/modules/header/components/menu/menu.service';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { SelectTab } from '../../../../../src/modules/header/components/menu/menu.actions';

const tabs: string[] = ['tab1', 'tab2', 'tab3'];
const fakeState: any = {
  menu: {
    tabs: of(tabs),
    selectedTab: of(tabs[0])
  }
};

describe('MenuComponent', () => {

  let testStore: any;
  let menuService: any;

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {

    testStore = {
      select: state => state(fakeState),
      dispatch: jasmine.createSpy()
    };
    menuService = jasmine.createSpyObj('MenuService', {
      getTabs: of(tabs)
    });

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: MenuService, useValue: menuService },
        { provide: Store, useValue: testStore }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it('should display all tabs', () => {
    const tabsCount: number = fixture.debugElement.queryAll(By.css('.menu li')).length;
    expect(tabsCount).toBe(3);
  });

  it('should have the first tab selected', () => {
    const firstTab: HTMLElement = fixture.nativeElement.querySelector('.menu li[class="selected"]');
    expect(firstTab).toBeTruthy();
  });

  it('should dispatch an action after clicking on a new tab', () => {
    const secondTab: HTMLElement = fixture.nativeElement.querySelector('.menu li:nth-child(2)');
    secondTab.click();
    fixture.detectChanges();
    const action = new SelectTab(tabs[1]);
    expect(testStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should toggle hamburger menu on icon click', () => {
    const hamburgerMenuIcon: HTMLElement = fixture.nativeElement.querySelector('.hamburger-menu');
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(false);
    hamburgerMenuIcon.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(true);
    hamburgerMenuIcon.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(false);
  });

});
