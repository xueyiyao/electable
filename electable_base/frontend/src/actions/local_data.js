import axios from "axios";
import {
  GET_LOCAL_OFFICES,
  GET_LOCAL_CANDIDATES,
  GET_TOP_LOCAL_CANDIDATES,
} from "./types";

export const getLocalData = (USstate, county) => (dispatch) => {
  var off = [];
  axios
    .get(
      `api/local_offices?local_election__state__state=${USstate}&local_election__local_area=${county}`
    )
    .then((res) => {
      dispatch({
        type: GET_LOCAL_OFFICES,
        payload: res.data,
      });
      off = res.data;
    })
    .then(() => {
      axios
        .get(
          `api/local_candidates?ordering=-score&office__local_election__local_area=${county}`
        )
        .then((res) => {
          dispatch({
            type: GET_LOCAL_CANDIDATES,
            payload: res.data,
          });

          var i,
            top = [];
          for (i = 0; i < off.length; i++) {
            top.push(
              res.data.filter(
                (local_candidate) => local_candidate.office == off[i].id
              )[0]
            );
          }

          dispatch({
            type: GET_TOP_LOCAL_CANDIDATES,
            payload: top,
          });
        });
    })
    .catch((err) => console.log(err));
};
