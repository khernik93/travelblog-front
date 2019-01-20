import photosResponse from '../../../../../utils/responses/photos.response';
import tabsResponse from '../../../../../utils/responses/tabs.response';

const swiperState: any = {
  header: {
    menu: {
      tabs: tabsResponse,
      selectedTab: Object.keys(photosResponse)[0]
    },
    swiper: {
      photos: photosResponse
    }
  }
};

export default swiperState;
