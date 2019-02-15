import { of } from 'rxjs';
import { TabsResponse } from '../../../../../utils/responses/tabs.response';

export class LayoutStubs {

  static selectedTab = TabsResponse[1];

  static getActivatedRouteStub(): any {
    return {
      paramMap: of({ get: (paramName) => LayoutStubs.selectedTab.id })
    };
  }

};
