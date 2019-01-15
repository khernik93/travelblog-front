import { MenuActions, MenuActionTypes } from './menu.actions';

export interface MenuState {
  selectedTab: string;
  tabs: string[];
};

export const initialState: MenuState = {
  selectedTab: null,
  tabs: []
};

export const menuReducer = (state = initialState, action: MenuActions): MenuState => {
  
  switch (action.type) {

    case MenuActionTypes.SelectTab: {
      return {
        ...state,
        selectedTab: action.selectedTab
      };
    }

    case MenuActionTypes.SetTabs: {
      return {
        ...state,
        tabs: action.tabs,
        selectedTab: action.tabs[0] || initialState.selectedTab
      }
    }

    default: {
      return state;
    }
  }

};
