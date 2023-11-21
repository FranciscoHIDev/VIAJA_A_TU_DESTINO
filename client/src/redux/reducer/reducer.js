import {
  GET_ALL_BANNERS,
  GET_ALL_OFFERS,
  GET_ALL_USERS,
  FILTER_CATEGORY,
  FILTER_DEPARTURE,
  CLEAR_FILTER,
  FILTER_DESTINATION

} from "../actions/actions";
const initialState = {
  offers: [],
  banners: [],
  topOffers:[],
  users: [],
  filters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OFFERS:
      return {
        ...state,
        offers: action.payload,
        filters: action.payload,
        topOffers:action.payload
      };

    case GET_ALL_BANNERS:
      return {
        ...state,
        banners: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case FILTER_CATEGORY:
      var categorys = state.filters.filter((offer) =>
        offer.category.name.includes(action.payload)
      );
      return {
        ...state,
        offers: [...categorys],
      };
      case CLEAR_FILTER:
        return{
          ...state,
          offers:initialState.filters
        }
    case FILTER_DEPARTURE:
      var departure = state.filters.filter((offer) =>          
          offer.departure.includes(action.payload)
      );    
      return {
        ...state,
        offers: [...departure],
      };
      case FILTER_DESTINATION:
      var destination = state.filters.filter((offer) =>          
          offer.destination.name.includes(action.payload)
      );    
      return {
        ...state,
        offers: [...destination],
      };
    default:
      return state;
  }
};

export default rootReducer;
