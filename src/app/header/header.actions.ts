import { Action } from '@ngrx/store';

export enum HeaderActionTypes {
  SelectTab = '[Menu] Select tab',
  SetTabs = '[Menu] Set tabs'
}

export class SelectTab implements Action {
  readonly type = HeaderActionTypes.SelectTab;

  constructor(public selectedTab: string) { }
}

export class SetTabs implements Action {
  readonly type = HeaderActionTypes.SetTabs;

  constructor(public tabs: string[]) { }
}

export type HeaderActions =
  | SelectTab
  | SetTabs;
