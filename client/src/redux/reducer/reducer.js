import { GET_ALL_BANNERS, GET_ALL_OFFERS, POST_USER } from "../actions/actions";
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

    default:
      return state;
  }
};

export default rootReducer;
