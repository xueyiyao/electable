import {
  GET_STATE_CANDIDATES,
  GET_TOP_STATE_CANDIDATES,
} from "../actions/types.js";

const initialState = {
  state_candidates: [],
  top_state_candidates: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATE_CANDIDATES:
      return {
        ...state,
        state_candidates: action.payload,
      };
    case GET_TOP_STATE_CANDIDATES:
      return {
        ...state,
        top_state_candidates: action.payload,
      };
    default:
      return state;
  }
}
