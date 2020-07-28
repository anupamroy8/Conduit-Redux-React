import { GET_TAGS } from "../actions/types";

const INITIAL_STATE = {
  tags: [],
};

const tagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};

export default tagReducer;
