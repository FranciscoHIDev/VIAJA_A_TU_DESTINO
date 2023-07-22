import {
  GET_ALL_BANNERS,
  GET_ALL_OFFERS,
  GET_ALL_HOTELS,
  GET_ALL_PACKAGES,
} from "../actions/actions";
const initialState = {
  offers: [],
  hotels: [],
  banners: [],
  packages: [],
  users: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case GET_ALL_BANNERS:
      return {
        ...state,
        banners: action.payload,
      };
    case GET_ALL_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case GET_ALL_PACKAGES:
      return {
        ...state,
        packages: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
