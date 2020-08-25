import axios from "axios";
import { GET_FEDERAL_OFFICES } from "./types";

// GET FEDERAL OFFICES
export const getFederalOffices = () => (dispatch) => {
  axios
    .get("/api/federal_offices/")
    .then((res) => {
      dispatch({
        type: GET_FEDERAL_OFFICES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
