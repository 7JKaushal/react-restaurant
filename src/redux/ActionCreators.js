import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseURL } from "../shared/baseURL";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});

// Redux Thunk for Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseURL + "dishes")
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// Redux Thunk for Comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseURL + "comments")
    .then((response) => response.json())
    .then((comments) => dispatch(addDishes(comments)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// REdux thunk for Promotion
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(baseURL + "promotions")
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromos(promotions)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
