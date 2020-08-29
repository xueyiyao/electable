import {
  GET_LOCAL_OFFICES,
  GET_LOCAL_CANDIDATES,
  GET_TOP_LOCAL_CANDIDATES,
  COUNTY_NOT_IN_STATE_ERROR,
  HIDE_COUNTY_NOT_IN_STATE_ALERT,
} from "../actions/types.js";

const initialState = {
  local_offices: [],
  local_candidates: [],
  top_local_candidates: [],
  county_not_in_state: false,
  show_county_not_in_state_alert: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCAL_OFFICES:
      return {
        ...state,
        local_offices: action.payload,
        county_not_in_state: false,
        show_county_not_in_state_alert: false,
      };
    case GET_LOCAL_CANDIDATES:
      return {
        ...state,
        local_candidates: action.payload,
      };
    case GET_TOP_LOCAL_CANDIDATES:
      return {
        ...state,
        top_local_candidates: action.payload,
      };
    case COUNTY_NOT_IN_STATE_ERROR:
      return {
        ...state,
        county_not_in_state: true,
        show_county_not_in_state_alert: true,
      };
    case HIDE_COUNTY_NOT_IN_STATE_ALERT:
      return {
        ...state,
        show_county_not_in_state_alert: false,
      };
    default:
      return state;
  }
}
