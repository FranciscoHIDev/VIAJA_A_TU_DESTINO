import {
  GET_ALL_BANNERS,
  GET_ALL_OFFERS,
  POST_USER,
  ALL_FILTERS,
} from "../actions/actions";
const initialState = {
  offers: [],
  banners: [],
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
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ALL_FILTERS:
      var categorys = state.offers.filter((offer) =>
        offer.category.name.includes(action.payload)
      );

      return {
        ...state,
        offers: [...categorys],
      };

    default:
      return state;
  }
};

export default rootReducer;
