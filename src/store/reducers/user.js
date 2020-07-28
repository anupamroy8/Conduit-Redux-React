import { SET_USER } from "../actions/types";

let initialState = {
  user: {},
  isLoggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export default userReducer;
