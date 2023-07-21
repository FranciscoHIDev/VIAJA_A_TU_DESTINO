import axios from "axios";

export const GET_ALL_OFFERS = "GET_ALL_OFFERS";
export const GET_ALL_BANNERS = "GET_ALL_BANNERS";

export const getAllOffers = async (dispatch) => {
  try {
    const { data } = await axios.get("/api/offers");
    dispatch({
      type: "GET_ALL_OFFERS",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBanners = async (dispatch) => {
  try {
    const { data } = await axios.get("/api/banners");
    dispatch({
      type: "GET_ALL_BANNERS",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
