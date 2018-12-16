export const selectUserName = (state, props) =>
  decodeURIComponent(props.match.params.username);
