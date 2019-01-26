import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { AddNewPostEffects } from '../../../../src/modules/admin/components/addNewPost/store/addNewPost.effects';
import { ApiClient } from '../../../../src/shared/clients/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { AddNewPostService } from '../../../../src/modules/admin/components/addNewPost/addNewPost.service';
import { AddNewPostStubs } from './helpers/addNewPost.stubs';
import { AddNewPost, AddNewPostSuccess, AddNewPostError } from '../../../../src/modules/admin/components/addNewPost/store/addNewPost.actions';

describe('AddNewPostEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let addNewPostService: jasmine.SpyObj<AddNewPostService>;

  let actions: TestActions;
  let effects: AddNewPostEffects;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    addNewPostService = AddNewPostStubs.getAddNewPostServiceStub();

    TestBed.configureTestingModule({
      providers: [
        AddNewPostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: AddNewPostService, useValue: addNewPostService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(AddNewPostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN AddNewPost action is dispatched
    THEN AddNewPostSuccess action is dispatched
  `, () => {
    const action = new AddNewPost(null, 'tab');
    const outcome = new AddNewPostSuccess();
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: { data: '' }});
    const expected = cold('--b', { b: outcome });
    apiClient.addNewPost.and.returnValue(response);
    expect(effects.addNewPost$).toBeObservable(expected);
  });

  it(`
    WHEN AddNewPost action is dispatched
    THEN AddNewPostError action is dispatched
  `, () => {
    const action = new AddNewPost(null, 'tab');
    const outcome = new AddNewPostError('error');
    actions.stream = hot('-a', {a: action});
    const clientErrorResponse = cold('-#|', {}, 'error');
    const expected = cold('--(b|)', { b: outcome });
    apiClient.addNewPost.and.returnValue(clientErrorResponse);
    expect(effects.addNewPost$).toBeObservable(expected);
  });

});
