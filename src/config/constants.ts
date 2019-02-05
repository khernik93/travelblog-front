import { constants as prodConstants } from './constants.prod';
import { constants as devConstants } from './constants.dev';

export default (ENV === 'production') ? 
  prodConstants : 
  devConstants;
