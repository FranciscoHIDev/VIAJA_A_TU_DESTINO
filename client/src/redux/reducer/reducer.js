import {
  GET_ALL_BANNERS,
  GET_ALL_OFFERS,
  POST_USER,
  FILTER_BY_PACKAGES,
  FILTER_BY_HOTELS,
  FILTER_BY_FLIGHTS,
  FILTER_BY_TOURS,
} from "../actions/actions";
const initialState = {
  offers: [],
  hotels: [],
  banners: [],
  users: [],
};

const rootReducer = (state = initialState, action) => {
  let packages;
  let hotels;
  let flights;
  let tours;
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
    case FILTER_BY_PACKAGES:
      packages = state.offers.filter(
        (offer) => offer.category.name === "Paquete".includes(action.payload)
      );
      return {
        ...state,
        offers: packages,
      };
    case FILTER_BY_HOTELS:
      hotels = state.offers.filter(
        (offer) => offer.category.name === "Hotel".includes(action.payload)
      );
      return {
        ...state,
        offers: hotels,
      };
    case FILTER_BY_FLIGHTS:
      flights = state.offers.filter(
        (offer) => offer.category.name === "Vuelo".includes(action.payload)
      );
      return {
        ...state,
        offers: flights,
      };
    case FILTER_BY_TOURS:
      tours = state.offers.filter(
        (offer) => offer.category.name === "Tour".includes(action.payload)
      );
      return {
        ...state,
        offers: tours,
      };

    default:
      return state;
  }
};

export default rootReducer;
