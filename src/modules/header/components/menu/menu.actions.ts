import { Action } from '@ngrx/store';

export enum MenuActionTypes {
  SelectTab = '[Menu] Select tab',
  SetTabs = '[Menu] Set tabs'
};

export class SelectTab implements Action {
  readonly type = MenuActionTypes.SelectTab;
  constructor(public selectedTab: string) { }
}

export class SetTabs implements Action {
  readonly type = MenuActionTypes.SetTabs;
  constructor(public tabs: string[]) { }
}

export type MenuActions =
  | SelectTab
  | SetTabs;
