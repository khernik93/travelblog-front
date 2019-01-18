import { of } from "rxjs";
import tabsResponse from '../responses/tabs';

export class MenuStubs {

  static getMenuService () {
    return jasmine.createSpyObj('MenuService', {
      getTabs: of(tabsResponse)
    });
  }

};
