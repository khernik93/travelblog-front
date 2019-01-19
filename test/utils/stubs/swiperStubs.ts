import { of } from "rxjs";
import photosResponse from '../responses/photos';

export class SwiperStubs {

  static getSwiperService () {
    return jasmine.createSpyObj('SwiperService', {
      getPhotos: of(photosResponse)
    });
  }

};
