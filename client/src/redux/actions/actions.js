import axios from "axios";
export const GET_ALL_OFFERS = "GET_ALL_OFFERS";
export const GET_ALL_BANNERS = "GET_ALL_BANNERS";
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";
export const POST_USER = "POST_USER";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const FILTER_DEPARTURE = "FILTER_DEPARTURE";
export  const CLEAR_FILTER = "CLEAR_FILTER"
export const FILTER_DESTINATION = "FILTER_DESTINATION"

export const getAllOffers = async (dispatch) => {
  try {
    const offers = await axios.get("/api/offers");
    dispatch({
      type: "GET_ALL_OFFERS",
      payload: offers.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllBanners = async (dispatch) => {
  try {
    const banners = await axios.get("/api/banners");
    dispatch({
      type: "GET_ALL_BANNERS",
      payload: banners.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (dispatch) => {
  try {
    const allUsers = await axios.get("/api/users");
    dispatch({
      type: "GET_ALL_USERS",
      payload: allUsers.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const postUser = (payload) => async (dispatch) => {
  try {
    const newUser = await axios.post("/api/users", payload);
    dispatch({
      type: "POST_USER",
      payload: newUser.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const filterByCategory = (payload) => {
  return {
    type: "FILTER_CATEGORY",
    payload,
  };
};

export const filterByDeparture = (payload) => {
  return {
    type: "FILTER_DEPARTURE",
    payload,
  };
};

export const filterByDestination = (payload) => {
  return {
    type: "FILTER_DESTINATION",
    payload,
  };
};
export const clearFilter = ()=>{
  return{
    type:"CLEAR_FILTER"
  }
}