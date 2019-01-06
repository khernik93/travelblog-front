/* tslint:disable: no-switch-case-fall-through */
import { HeaderActions, HeaderActionTypes } from './header.actions';

export interface HeaderState {
  selectedTab: string;
  tabs: string[];
}

export const initialState: HeaderState = {
  selectedTab: null,
  tabs: []
};

export function headerReducer(state = initialState, action: HeaderActions): HeaderState {
  switch (action.type) {

    case HeaderActionTypes.SelectTab: {
      return {
        ...state,
        selectedTab: action.selectedTab
      };
    }

    case HeaderActionTypes.SetTabs: {
      return {
        ...state,
        tabs: action.tabs
      }
    }

    default: {
      return state;
    }
  }
}
