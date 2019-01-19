import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import { SwiperEffects } from '../../../../../src/modules/header/components/swiper/swiper.effects';
import { GetPhotos, SetPhotos } from '../../../../../src/modules/header/components/swiper/swiper.actions';
import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';
import { SwiperStubs } from '../../../../utils/stubs/swiperStubs';
import photosResponse from '../../../../utils/responses/photos';

describe('SwiperEffects', () => {

  let swiperService: jasmine.SpyObj<SwiperService>;

  let actions: TestActions;
  let effects: SwiperEffects;

  beforeEach(() => {

    swiperService = SwiperStubs.getSwiperService();

    TestBed.configureTestingModule({
      providers: [
        SwiperEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SwiperService, useValue: swiperService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(SwiperEffects);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPhotos action is dispatched
    THEN swiperService.getTabs method should be executed
    AND SetPhotos action should be dispatched with fetched photos
  `, () => {
    const action = new GetPhotos();
    const outcome = new SetPhotos(photosResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: photosResponse });
    const expected = cold('--b', { b: outcome });
    swiperService.getPhotos.and.returnValue(response);
    expect(effects.getPhotos$).toBeObservable(expected);
  });

});
