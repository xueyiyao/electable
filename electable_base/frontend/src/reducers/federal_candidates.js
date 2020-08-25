import {
  GET_FEDERAL_CANDIDATES,
  GET_FEDERAL_CANDIDATES_PARTICULAR,
  GET_TOP_CANDIDATES,
} from "../actions/types.js";

const initialState = {
  federal_candidates: [],
  top_candidates: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEDERAL_CANDIDATES:
      return {
        ...state,
        federal_candidates: action.payload,
      };
    case GET_FEDERAL_CANDIDATES_PARTICULAR:
      return {
        ...state,
        federal_candidates: state.federal_candidates.filter(
          (federal_candidate) => federal_candidate.office == action.payload
        ),
      };
    case GET_TOP_CANDIDATES:
      return {
        ...state,
        top_candidates: action.payload,
      };
    default:
      return state;
  }
}
