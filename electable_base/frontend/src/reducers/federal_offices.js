import { GET_FEDERAL_OFFICES } from "../actions/types.js";

const initialState = {
  federal_offices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEDERAL_OFFICES:
      return {
        ...state,
        federal_offices: action.payload,
      };
    default:
      return state;
  }
}
