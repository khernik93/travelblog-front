import { of } from "rxjs";
import { State } from "../state/state";

export class AppStubs {

  static selectedTab = State.header.menu.selectedTab;

  static activatedRoute(): any {
    return {
      paramMap: of({ get: (paramName) => AppStubs.selectedTab.id })
      
    };
  }

};
