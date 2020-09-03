import axios from "axios";
import {
  GET_LOCAL_OFFICES,
  GET_LOCAL_CANDIDATES,
  GET_TOP_LOCAL_CANDIDATES,
  COUNTY_NOT_IN_STATE_ERROR,
  HIDE_COUNTY_NOT_IN_STATE_ALERT,
} from "./types";

// GET LOCAL OFFICES, CANDIDATES, AND SENDS ERROR IF COUNTY NOT IN STATE
export const getLocalData = (USstate, county) => (dispatch) => {
  axios
    .get(`api/local_election?state__state=${USstate}`)
    .then((res) => {
      var county_not_in_state = true;
      var i;
      for (i = 0; i < res.data.length; i++) {
        if (county.toLowerCase() == res.data[i].local_area.toLowerCase()) {
          county_not_in_state = false;
        }
      }
      // console.log(county_not_in_state);
      if (county_not_in_state) {
        dispatch({
          type: COUNTY_NOT_IN_STATE_ERROR,
        });
      } else {
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
          });
      }
    })
    .catch((err) => console.log(err));
};

// HIDES THE COUNTY NOT IN STATE ALERT
export const hideCountyNotInStateAlert = () => (dispatch) => {
  dispatch({
    type: HIDE_COUNTY_NOT_IN_STATE_ALERT,
  });
};

export const getLocalOfficeById = (id) => (dispatch) => {
  axios
    .get(`/api/local_offices?id=${id}`)
    .then((res) => {
      dispatch({
        type: GET_LOCAL_OFFICES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getLocalCandidatesByOfficeId = (office_id) => (dispatch) => {
  axios
    .get(`/api/local_candidates?ordering=-score&office__id=${office_id}`)
    .then((res) => {
      dispatch({
        type: GET_LOCAL_CANDIDATES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getLocalCandidateById = (id) => (dispatch) => {
  axios
    .get(`/api/local_candidates?id=${id}`)
    .then((res) => {
      dispatch({
        type: GET_LOCAL_CANDIDATES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
