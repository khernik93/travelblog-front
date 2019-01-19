import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

import { MenuComponent } from '../../../../../src/modules/header/components/menu/menu.component';
import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import TabsResponse from '../../../../utils/responses/tabs';
import { CssHelper } from '../../../../utils/helpers/css';
import { HeaderState } from '../../../../../src/modules/header/header.reducers';
import { APP_MODULE_STORE_AND_EFFECTS } from '../../../../../src/modules/app/app.module';
import { MenuStubs } from '../../../../utils/stubs/menuStubs';
import { MenuService } from '../../../../../src/modules/header/components/menu/menu.service';
import { MenuEffects } from '../../../../../src/modules/header/components/menu/menu.effects';

describe('MenuComponent', () => {

  let store: Store<HeaderState>;
  let menuService: jasmine.SpyObj<MenuService>;

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {

    menuService = MenuStubs.getMenuService();

    TestBed.configureTestingModule({
      imports: [
        ...MODULE_IMPORTS,
        ...APP_MODULE_STORE_AND_EFFECTS,
        EffectsModule.forFeature([MenuEffects])
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
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all tabs are visible
  `, () => {
    const tabsCount: number = fixture.debugElement.queryAll(By.css('.menu li')).length;
    expect(tabsCount).toBe(TabsResponse.length);
  });

  it(`
    WHEN the component is loaded
    THEN the first tab is selected
  `, () => {
    const firstTab: HTMLElement = fixture.nativeElement.querySelector('.menu li:nth-child(1)');
    expect(CssHelper.getClass(firstTab)).toEqual('selected');
  });

  it(`
    WHEN another tab is selected
    THEN the photos change properly
  `, () => {
    const secondTab = fixture.nativeElement.querySelector('.menu li:nth-child(2)');
    secondTab.click();
    fixture.detectChanges();
    expect(CssHelper.getClass(secondTab)).toEqual('selected');
  });

  it(`
    WHEN user enters the page in mobile version
    THEN the tabs should be displayed as hamburger menu
    AND initialy it should be opened
  `, () => {
    let hamburgerMenuOpened = true;
    const hamburgerMenuIcon: HTMLElement = fixture.nativeElement.querySelector('.hamburger-menu');
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(hamburgerMenuOpened);
    hamburgerMenuIcon.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(!hamburgerMenuOpened);
    hamburgerMenuIcon.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.hamburgerMenuOpened).toBe(hamburgerMenuOpened);
  });

});
