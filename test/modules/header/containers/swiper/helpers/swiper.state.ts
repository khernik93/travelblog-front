import { PhotosResponse } from '../../../../../utils/responses/photos.response';
import { TabsResponse } from '../../../../../utils/responses/tabs.response';

export const SwiperState: any = {
  header: {
    menu: {
      tabs: TabsResponse,
      selectedTab: TabsResponse[0]
    },
    swiper: {
      photos: PhotosResponse
    }
  }
};
