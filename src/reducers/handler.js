export default function handler(state, action, reacts) {
  if (
    reacts.hasOwnProperty(action.type) &&
    typeof reacts[action.type] === "function"
  ) {
    return reacts[action.type](state, action.payload);
  }
  return state;
}
