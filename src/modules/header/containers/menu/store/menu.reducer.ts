import get from 'lodash-es/get';
import { MenuActions, MenuActionTypes } from './menu.actions';
import { TabDTO } from '../../../../../shared/clients/backend/backend.model';

export interface MenuState {
  selectedTab: TabDTO;
  tabs: TabDTO[];
};

export const initialState: MenuState = {
  selectedTab: null,
  tabs: []
};

export function menuReducer (state = initialState, action: MenuActions): MenuState {
  
  switch (action.type) {

    case MenuActionTypes.SelectTab: {
      return { ...state, selectedTab: action.selectedTab };
    }

    case MenuActionTypes.SetTabs: {
      return {
        ...state,
        tabs: action.tabs
      }
    }

    default: {
      return state;
    }
  }

};
