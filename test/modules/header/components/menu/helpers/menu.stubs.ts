import { of } from "rxjs";
import tabsResponse from '../../../../../utils/responses/tabs.response';

export class MenuStubs {

  static getMenuService () {
    return jasmine.createSpyObj('MenuService', {
      getTabs: of(tabsResponse)
    });
  }

};
