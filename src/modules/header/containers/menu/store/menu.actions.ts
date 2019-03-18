import { Action } from '@ngrx/store';
import { TabDTO } from '../../../../../shared/clients/backend/backend.model';

export enum MenuActionTypes {
  SelectTab = '[Menu] Select tab',
  SelectTabById = '[Menu] Select tab by id',
  GetTabs = '[Menu] Get tabs',
  SetTabs = '[Menu] Set tabs'
};

export class SelectTab implements Action {
  readonly type = MenuActionTypes.SelectTab;
  constructor(public selectedTab: TabDTO) { }
}

export class SelectTabById implements Action {
  readonly type = MenuActionTypes.SelectTabById;
  constructor(public id: number) { }
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
  | SelectTabById
  | GetTabs
  | SetTabs;
