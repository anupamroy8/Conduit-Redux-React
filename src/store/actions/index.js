import { GET_ARTICLES, GET_TAGS, SET_USER } from "./types";

export function getArticles(payload) {
  return {
    type: GET_ARTICLES,
    payload,
  };
}

export function getTags(payload) {
  return {
    type: GET_TAGS,
    payload,
  };
}

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}
