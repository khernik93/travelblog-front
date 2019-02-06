import get from 'lodash-es/get';
import { MenuActions, MenuActionTypes } from './menu.actions';
import { Tab } from '../../../../../shared/clients/api/api.model';

export interface MenuState {
  selectedTab: Tab;
  tabs: Tab[];
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
        tabs: action.tabs,
        selectedTab: get(action, 'tabs[0]') || initialState.selectedTab
      }
    }

    default: {
      return state;
    }
  }

};
