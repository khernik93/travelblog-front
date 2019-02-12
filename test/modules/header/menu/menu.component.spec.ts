import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import cloneDeep from 'lodash-es/cloneDeep';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from '../../../../src/modules/header/components/menu/menu.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/header/header.module';
import { TabsResponse } from '../../../utils/responses/tabs.response';
import { CssHelper } from '../../../utils/helpers/css';
import { HeaderState } from '../../../../src/modules/header/store/header.reducers';
import { MockStore } from '../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MenuState } from './helpers/menu.state';
import { GetTabs } from '../../../../src/modules/header/components/menu/store/menu.actions';

describe('MenuComponent', () => {

  let store: MockStore<HeaderState>;

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(MenuState));
    spyOn(store, 'dispatch').and.callThrough();
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
    WHEN the component is loaded
    THEN GetTabs is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
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
