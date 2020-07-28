import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user";
import articleReducer from "./reducers/article";
import tagReducer from "./reducers/tag";

let rootReducer = combineReducers({ userReducer, articleReducer, tagReducer });

const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
