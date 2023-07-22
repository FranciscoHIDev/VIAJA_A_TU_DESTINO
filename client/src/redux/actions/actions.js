import axios from "axios";
export const GET_ALL_OFFERS = "GET_ALL_OFFERS";
export const GET_ALL_BANNERS = "GET_ALL_BANNERS";
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";

export const getAllOffers = async (dispatch) => {
  try {
    const offers = await axios.get("/api/offers");
    dispatch({
      type: "GET_ALL_OFFERS",
      payload: offers.data,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const getAllHotels = async (dispatch) => {
  try {
    const hotels = await axios.get("/api/hotels");
    dispatch({
      type: "GET_ALL_HOTELS",
      payload: hotels.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPackages = async (dispatch) => {
  try {
    const packages = await axios.get("/api/packages");
    dispatch({
      type: "GET_ALL_PACKAGES",
      payload: packages.data,
    });
  } catch (error) {
    console.log(error);
  }
};
