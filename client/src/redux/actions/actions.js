import axios from "axios";
export const GET_ALL_OFFERS = "GET_ALL_OFFERS";
export const GET_ALL_BANNERS = "GET_ALL_BANNERS";
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";
export const POST_USER = "POST_USER";
export const FILTER_BY_PACKAGES = "FILTER_BY_PACKAGES";
export const FILTER_BY_HOTELS = "FILTER_BY_HOTELS";
export const FILTER_BY_FLIGHTS = "FILTER_BY_FLIGHTS";
export const FILTER_BY_TOURS = "FILTER_BY_TOURS";

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

export const filterByPackages = (payload) => {
  return {
    type: "FILTER_BY_PACKAGES",
    payload,
  };
};

export const filterByHotels = (payload) => {
  return {
    type: "FILTER_BY_HOTELS",
    payload,
  };
};
export const filterByFlights = (payload) => {
  return {
    type: "FILTER_BY_FLIGHTS",
    payload,
  };
};

export const filterByTours = (payload) => {
  return {
    type: "FILTER_BY_TOURS",
    payload,
  };
};
