import {
  GET_LOCAL_OFFICES,
  GET_LOCAL_CANDIDATES,
  GET_TOP_LOCAL_CANDIDATES,
} from "../actions/types.js";

const initialState = {
  local_offices: [],
  local_candidates: [],
  top_local_candidates: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCAL_OFFICES:
      return {
        ...state,
        local_offices: action.payload,
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
    default:
      return state;
  }
}
