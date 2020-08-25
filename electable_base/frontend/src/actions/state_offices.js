import axios from "axios";
import {
  GET_STATE_OFFICES,
  GET_STATE_CANDIDATES,
  GET_TOP_STATE_CANDIDATES,
} from "./types";

// Makes requests for state_offices, state_candidates, and top_state_candidates
export const getStateData = (USstate) => (dispatch) => {
  var off = [];
  axios
    .get(`api/state_office?state_election__state=${USstate}`)
    .then((res) => {
      dispatch({
        type: GET_STATE_OFFICES,
        payload: res.data,
      });
      off = res.data;
    })
    .then(() =>
      axios
        .get(
          `/api/state_candidates?ordering=-score&office__state_election__state=${USstate}`
        )
        .then((res) => {
          dispatch({
            type: GET_STATE_CANDIDATES,
            payload: res.data,
          });

          var i,
            top = [];
          for (i = 0; i < off.length; i++) {
            top.push(
              res.data.filter(
                (state_candidate) => state_candidate.office == off[i].id
              )[0]
            );
          }

          dispatch({
            type: GET_TOP_STATE_CANDIDATES,
            payload: top,
          });
        })
    )
    .catch((err) => console.log(err));
};
