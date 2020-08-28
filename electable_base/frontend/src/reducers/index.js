import { combineReducers } from "redux";
import federal_offices from "./federal_offices";
import federal_candidates from "./federal_candidates";
import state_offices from "./state_offices";
import state_candidates from "./state_candidates";
import local_data from "./local_data";

export default combineReducers({
  federal_offices,
  federal_candidates,
  state_offices,
  state_candidates,
  local_data,
});
