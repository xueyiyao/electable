import axios from "axios";
import {
  GET_FEDERAL_CANDIDATES,
  GET_FEDERAL_CANDIDATES_PARTICULAR,
  GET_TOP_CANDIDATES,
} from "./types";

// GET FEDERAL CANDIDATES
export const getFederalCandidates = (office__id) => (dispatch) => {
  if (office__id == null) {
    axios
      .get(`/api/federal_candidates?ordering=-score`)
      .then((res) => {
        dispatch({
          type: GET_FEDERAL_CANDIDATES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`/api/federal_candidates?ordering=-score&office__id=${office__id}`)
      .then((res) => {
        dispatch({
          type: GET_FEDERAL_CANDIDATES_PARTICULAR,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
};

// GET TOP CANDIDATES
export const getTopCandidates = (top) => (dispatch) => {
  dispatch({
    type: GET_TOP_CANDIDATES,
    payload: top,
  });
};

export const getFederalCandidateById = (id) => (dispatch) => {
  axios
    .get(`/api/federal_candidates?id=${id}`)
    .then((res) => {
      dispatch({
        type: GET_FEDERAL_CANDIDATES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
