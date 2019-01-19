import { TestBed } from '@angular/core/testing';

import { MenuService } from '../../../../../src/modules/header/components/menu/menu.service';
import { TransferHttpService } from '../../../../../src/shared/services/transferHttp.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('MenuService', () => {

  let menuService: MenuService;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {

    transferHttpService = SharedStubs.getTransferHttpService();

    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: TransferHttpService, useValue: transferHttpService }
      ]
    });

  });

  beforeEach(() => {
    menuService = TestBed.get(MenuService);
  });

  it(`
    WHEN there is a call to getTabs method
    THEN transferHttpService.get method should be called
  `, () => {
    menuService.getTabs();
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
