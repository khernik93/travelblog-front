import { of } from "rxjs";
import photosResponse from '../../../../../utils/responses/photos.response';

export class SwiperStubs {

  static getSwiperService () {
    return jasmine.createSpyObj('SwiperService', {
      getPhotos: of(photosResponse)
    });
  }

};
