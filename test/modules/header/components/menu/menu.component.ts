import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { MenuComponent } from '../../../../../src/modules/header/components/menu/menu.component';
import { MenuService } from '../../../../../src/modules/header/components/menu/menu.service';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { SelectTab } from '../../../../../src/modules/header/components/menu/menu.actions';
import { MockStoreModule, MockAction } from '../../../../utils/mock-store';
import { getClass } from '../../../../utils/css';

const tabs: string[] = ['tab1', 'tab2', 'tab3'];
const fakeState: any = {
  menu: {
    tabs: tabs,
    selectedTab: tabs[0]
  }
};

describe('MenuComponent', () => {

  let store: any;
  let menuService: jasmine.SpyObj<MenuService>;

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {

    menuService = jasmine.createSpyObj('MenuService', {
      getTabs: of(tabs)
    });

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        MockStoreModule.forRoot('menu', fakeState.menu)
      ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: MenuService, useValue: menuService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
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

  /**
   * @TODO Test click() method instead
   */
  it('should change selected tab after clicking on a new tab', async(() => {
    store.dispatch(new MockAction({selectedTab: tabs[1]}));
    fixture.detectChanges();
    expect(getClass(fixture.nativeElement.querySelector('.menu li:nth-child(2)'))).toEqual('selected');
  }));

  /**
   * @TODO Uncomment when issue fixed (see ticket FE-15)
   */
  /*
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
  */

});
