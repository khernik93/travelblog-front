import photosResponse from '../responses/photos';
import tabsResponse from '../responses/tabs';

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
