import ActionTypes from "../types";

export default {
  clearErrors: () => {
    return {
      type: ActionTypes.ERROR_CLEAR
    };
  }
};
