import * as ActionTypes from "./ActionTypes";
import baseUrl from "../shared/baseUrl";

// Redux Thunk for posting a new feedback
export const postFeedback =
  (firstName, lastName, telnum, email, agree, contactType, feedback) =>
  (dispatch) => {
    const newFeedback = {
      firstName,
      lastName,
      telnum,
      email,
      agree,
      contactType,
      feedback,
    };
    newFeedback.date = new Date().toDateString();

    /* First .then() checks if there is any error while receiving data from the server
     * if response code is anything other than 200 (status OK), New error is generated (else block : line 37-43)
     * if there is error without any response code, code from line 45-48 is executed.
     * Error is catch-ed at line 55 and dishesFailed is dispatched.
     */

    return fetch(baseUrl + "feedback", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "same-origin",
    })
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
      .then((response) => {
        alert(JSON.stringify(response));
        dispatch(addFeedback(response));
      })
      .catch((error) => {
        console.log(`${error}`);
        alert("Feedback not submitted");
      });
  };

export const addFeedback = (feedback) => ({
  type: ActionTypes.POST_FEEDBACK,
  payload: feedback,
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

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

// Redux Thunk for Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
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
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
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

// Redux Thunk for Leaders
export const fetchLeaders = () => (dispatch) => {
  return fetch(baseUrl + "leaders")
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
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const leadersFailed = (errMsg) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMsg,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});
