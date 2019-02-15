import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from '../../../../../src/modules/header/components/menu/menu.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { TabsResponse } from '../../../../utils/responses/tabs.response';
import { MenuState } from '../../containers/menu/helpers/menu.state';
import { CssHelper } from '../../../../utils/helpers/css';
import { of } from 'rxjs';

describe('MenuComponent', () => {

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.tabs$ = of(MenuState.header.menu.tabs);
    component.selectedTab$ = of(MenuState.header.menu.selectedTab);
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all tabs are visible
  `, (done) => {
    setTimeout(() => {
      fixture.detectChanges();
      const tabs = fixture.debugElement.queryAll(By.css('.menu li'));
      expect(tabs.length).toBe(TabsResponse.length);
      done();
    }, 0);
  });

  it(`
    WHEN the component is loaded
    THEN the first tab is selected
  `, (done) => {
    setTimeout(() => {
      fixture.detectChanges();
      const firstTab: HTMLElement = fixture.nativeElement.querySelector('.menu li:nth-child(1)');
      expect(CssHelper.getClass(firstTab)).toEqual('selected');
      done();
    }, 0);
  });

  it(`
    WHEN user enters the page in mobile version
    THEN the tabs should be displayed as hamburger menu
    AND initialy it should be opened
  `, () => {
    let opened = true;
    const hamburgerMenuIcon: HTMLElement = fixture.nativeElement.querySelector('.hamburger-menu');
    Helper.assertHamburgerMenuIs(opened);
    hamburgerMenuIcon.click();
    Helper.assertHamburgerMenuIs(!opened);
    hamburgerMenuIcon.click();
    Helper.assertHamburgerMenuIs(opened);
  });

  class Helper {

    static assertHamburgerMenuIs(state: boolean): void {
      fixture.detectChanges();
      expect(fixture.componentInstance.hamburgerMenuOpened).toBe(state);
    }

  }

});
