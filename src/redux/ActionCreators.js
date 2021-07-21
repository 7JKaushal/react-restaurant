import * as ActionTypes from "./ActionTypes";
import baseUrl from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId,
    rating,
    author,
    comment,
  };

  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(`${response.status} : ${response.statusText}`);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log(`${error}`);
      alert("Comment not submitted");
    });
};

// Redux Thunk for Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return (
    fetch(baseUrl + "dishes")
      /* First .then() checks if there is any error while receiving data from the server
       * if response code is anything other than 200 (status OK), New error is generated (line 25-29)
       * if there is error without any response code, code from line 32-35 is executed.
       * Error is catch-ed at line 40 and dishesFailed is dispatched.
       */

      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error(
              `${response.status} : ${response.statusText}`
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          let errMsg = new Error(error.message);
          throw errMsg;
        }
      )
      .then((response) => response.json())
      .then((dishes) => dispatch(addDishes(dishes)))
      .catch((error) => dispatch(dishesFailed(error.message)))
  );
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMsg,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// Redux Thunk for Comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(`${response.status} : ${response.statusText}`);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMsg) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMsg,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// REdux thunk for Promotion
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => {
      alert(`ALERT! ${error.message}`);
      dispatch(promosFailed(error.message));
    });
};
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errMsg) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMsg,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
