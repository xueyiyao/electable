import { GET_STATE_OFFICES } from "../actions/types.js";

const initialState = {
  state_offices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATE_OFFICES:
      return {
        ...state,
        state_offices: action.payload,
      };
    default:
      return state;
  }
}
