import * as ActionTypes from "./ActionTypes";

export const Leaders = (
  state = {
    isLoading: true,
    errMsg: null,
    leaders: [],
  },
  actions
) => {
  switch (actions.type) {
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        leaders: actions.payload,
      };

    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true, errMsg: null, leaders: [] };

    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: actions.payload,
        leaders: [],
      };

    default:
      return state;
  }
};
