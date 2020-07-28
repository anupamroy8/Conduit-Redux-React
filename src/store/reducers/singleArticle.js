import {
  GET_SINGLE_ARTICLE,
  GET_SINGLE_ARTICLE_COMMENTS,
} from "../actions/types";

const INITIAL_STATE = {
  article: {},
  comments: {},
};

const singleArticleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case GET_SINGLE_ARTICLE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default singleArticleReducer;
