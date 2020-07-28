import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user";
import articleReducer from "./reducers/article";
import tagReducer from "./reducers/tag";
import singleArticleReducer from "./reducers/singleArticle";

let rootReducer = combineReducers({
  userReducer,
  articleReducer,
  tagReducer,
  singleArticleReducer,
});

const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
