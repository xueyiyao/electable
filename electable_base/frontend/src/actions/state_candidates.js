// import axios from "axios";
// import { GET_STATE_CANDIDATES, GET_TOP_STATE_CANDIDATES } from "./types";

// // GET STATE CANDIDATES
// export const getStateCandidates = (USstate) => (dispatch) => {
//   axios
//     .get(
//       `/api/state_candidates?ordering=-score&office__state_election__state=${USstate}`
//     )
//     .then((res) => {
//       dispatch({
//         type: GET_STATE_CANDIDATES,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// // GET TOP STATE CANDIDATES
// export const getTopStateCandidates = (top) => (dispatch) => {
//   dispatch({
//     type: GET_TOP_STATE_CANDIDATES,
//     payload: top,
//   });
// };
