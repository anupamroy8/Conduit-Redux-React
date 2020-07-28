import {
  GET_ARTICLES,
  GET_TAGS,
  SET_USER,
  GET_SINGLE_ARTICLE,
  GET_SINGLE_ARTICLE_COMMENTS,
} from "./types";

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

export function getSingleArticle(payload) {
  return {
    type: GET_SINGLE_ARTICLE,
    payload,
  };
}

export function getSingleArticleComments(payload) {
  return {
    type: GET_SINGLE_ARTICLE_COMMENTS,
    payload,
  };
}
