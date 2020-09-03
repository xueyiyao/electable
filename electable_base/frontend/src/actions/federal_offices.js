import axios from "axios";
import { GET_FEDERAL_OFFICES } from "./types";

// GET FEDERAL OFFICES
export const getFederalOffices = (id) => (dispatch) => {
  if (id == null) {
    axios
      .get("/api/federal_offices/")
      .then((res) => {
        dispatch({
          type: GET_FEDERAL_OFFICES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`/api/federal_offices?id=${id}`)
      .then((res) => {
        dispatch({
          type: GET_FEDERAL_OFFICES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
};
