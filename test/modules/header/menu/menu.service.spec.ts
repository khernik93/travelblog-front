import { TestBed } from '@angular/core/testing';

import { MenuService } from '../../../../src/modules/header/components/menu/menu.service';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ApiClient } from '../../../../src/shared/clients/api.client';

describe('MenuService', () => {

  let menuService: MenuService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {

    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: ApiClient, useValue: apiClient }
      ]
    });

  });

  beforeEach(() => {
    menuService = TestBed.get(MenuService);
  });

  it(`
    WHEN there is a call to getTabs method
    THEN ApiClient.getTabs method should be called
  `, () => {
    menuService.getTabs();
    expect(apiClient.getTabs).toHaveBeenCalled();
  });

});
