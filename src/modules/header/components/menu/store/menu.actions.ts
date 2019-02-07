import { Action } from '@ngrx/store';
import { TabDTO } from '../../../../../shared/clients/api/api.model';

export enum MenuActionTypes {
  SelectTab = '[Menu] Select tab',
  GetTabs = '[Menu] Get tabs',
  SetTabs = '[Menu] Set tabs'
};

export class SelectTab implements Action {
  readonly type = MenuActionTypes.SelectTab;
  constructor(public selectedTab: TabDTO) { }
}

export class GetTabs implements Action {
  readonly type = MenuActionTypes.GetTabs;
  constructor() { }
}

export class SetTabs implements Action {
  readonly type = MenuActionTypes.SetTabs;
  constructor(public tabs: TabDTO[]) { }
}

export type MenuActions =
  | SelectTab
  | GetTabs
  | SetTabs;
