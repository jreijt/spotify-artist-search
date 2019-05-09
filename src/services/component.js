import { bindActionCreators } from "redux";

export default {
  generateMapProps: propNames => {
    return state => {
      return propNames.reduce((result, name) => {
        if (state.hasOwnProperty(name)) result[name] = state[name];
        else console.warn(`${name} does not exist in state.`);
        return result;
      }, {});
    };
  },
  generateMapActions: actions => {
    return dispatch => {
      return bindActionCreators({ ...actions }, dispatch);
    };
  }
};
